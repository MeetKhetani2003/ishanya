import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/db";
import { LeadModel } from "@/db/models";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(6, "A valid phone number is required"),
  interest: z.string().optional().default(""),
  intent: z.string().optional().default("Consultation"),
  budget: z.string().optional().default(""),
  preferredDate: z.string().optional().default(""),
  message: z.string().optional().default(""),
  source: z.string().optional().default("website"),
});

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }
    const lead = await LeadModel.create(parsed.data);
    return NextResponse.json({ ok: true, id: lead._id });
  } catch {
    return NextResponse.json(
      { error: "We could not record that just now. Please call the concierge." },
      { status: 500 },
    );
  }
}
