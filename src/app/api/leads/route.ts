import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads } from "@/db/schema";

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
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }
    const [row] = await db.insert(leads).values(parsed.data).returning();
    return NextResponse.json({ ok: true, id: row.id });
  } catch {
    return NextResponse.json(
      { error: "We could not record that just now. Please call the concierge." },
      { status: 500 },
    );
  }
}
