import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { connectDB } from "@/lib/DB/connectDB";
import { Booking } from "@/lib/Models/bookings";

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    const consumerKey = process.env.MPESA_CONSUMER_KEY!;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
    const shortCode = process.env.MPESA_SHORTCODE!;
    const passKey = process.env.MPESA_PASSKEY!;
    const phoneNumber = process.env.TEST_PHONE_NUMBER!;

    // 🔑 Get OAuth token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );
    const tokenRes = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const accessToken = tokenRes.data.access_token;

    // 🕒 Generate timestamp (yyyyMMddHHmmss)
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const timestamp =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

    // 🔐 Encode password
    const password = Buffer.from(shortCode + passKey + timestamp).toString(
      "base64"
    );

    // 📲 Send STK push
    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1, // test amount
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: "https://yourdomain.com/api/payments/callback",
        AccountReference: bookingId,
        TransactionDesc: "Booking Payment",
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const checkoutId = stkRes.data.CheckoutRequestID;

    // 🟢 Save CheckoutRequestID in Booking for callback matching
    await connectDB();
    await Booking.updateOne({ _id: bookingId }, { $set: { checkoutId } });

    return NextResponse.json({ success: true, data: stkRes.data });
  } catch (error: unknown) {
    let message = "Unknown error";
    let details: unknown = null; // ✅ use unknown instead of any

    if (error instanceof AxiosError) {
      message = error.message;
      details = error.response?.data;
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error("M-Pesa error:", details || message);

    return NextResponse.json(
      {
        error: "Payment initiation failed",
        details: details || message,
      },
      { status: 500 }
    );
  }
}
