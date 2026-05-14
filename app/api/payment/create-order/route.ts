import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { PRICING_PLANS } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    const plan = PRICING_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: plan.price * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { planId, planName: plan.name },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
