import { connectDB } from "@/lib/DB/connectDB";
import { Booking } from "@/lib/Models/bookings";
import {
  MpesaCallbackBody,
  MpesaCallbackItem,
} from "@/lib/TSInterfaces/typescriptinterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    const body: MpesaCallbackBody = await req.json();
    console.log("📥 Raw Callback Body:", JSON.stringify(body, null, 2));

    const stkCallback = body.Body.stkCallback;
    const { ResultCode, CheckoutRequestID, CallbackMetadata } = stkCallback;

    const metadata: MpesaCallbackItem[] = CallbackMetadata?.Item || [];

    // Extract values from metadata safely
    const mpesaReceipt = metadata.find(
      (i: MpesaCallbackItem) => i.Name === "MpesaReceiptNumber"
    )?.Value as string | undefined;

    const transactionDate = metadata.find(
      (i: MpesaCallbackItem) => i.Name === "TransactionDate"
    )?.Value as number | undefined;

    // Update booking in DB
    await Booking.updateOne(
      { checkoutId: CheckoutRequestID },
      {
        $set: {
          status: ResultCode === 0 ? "Paid" : "Failed",
          mpesaReceipt,
          transactionDate,
        },
      }
    );

    return NextResponse.json({ message: "Callback received" });
  } catch (err) {
    // Type-safe error handling
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Callback error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to process callback" },
      { status: 500 }
    );
  }
}
