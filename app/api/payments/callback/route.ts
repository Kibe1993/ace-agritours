import { connectDB } from "@/lib/DB/connectDB";
import { Booking } from "@/lib/Models/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // ✅ Ensure DB is connected

    const body = await req.json();

    console.log("📩 M-Pesa Callback:", JSON.stringify(body, null, 2));

    const stkCallback = body?.Body?.stkCallback;
    const resultCode = stkCallback?.ResultCode;
    const resultDesc = stkCallback?.ResultDesc;
    const checkoutId = stkCallback?.CheckoutRequestID;
    const metadata = stkCallback?.CallbackMetadata?.Item;

    // Extract values from metadata safely
    const mpesaReceipt = metadata?.find(
      (i: any) => i.Name === "MpesaReceiptNumber"
    )?.Value;
    const transactionDate = metadata?.find(
      (i: any) => i.Name === "TransactionDate"
    )?.Value;

    // ✅ Save to DB
    await Booking.updateOne(
      { checkoutId },
      {
        $set: {
          status: resultCode === 0 ? "Paid" : "Failed",
          mpesaReceipt,
          transactionDate,
        },
      }
    );

    return NextResponse.json({ message: "Callback received" });
  } catch (err: any) {
    console.error("❌ Callback error:", err.message);
    return NextResponse.json(
      { error: "Failed to process callback" },
      { status: 500 }
    );
  }
}
