import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const LAYOUT_PATH = path.join(process.cwd(), "content", "bento-layout.json");

const DEFAULT_LAYOUT = {
  columns: [
    ["vote-in", "socials", "projects"],
    ["behance", "gpacts", "prototypes"],
    ["edge-crm", "experience", "tools"],
  ],
};

async function getLayout() {
  try {
    const data = await fs.readFile(LAYOUT_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return DEFAULT_LAYOUT;
  }
}

export async function GET() {
  const layout = await getLayout();
  return NextResponse.json({ layout });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.columns || !Array.isArray(body.columns)) {
      return NextResponse.json({ error: "Invalid columns format" }, { status: 400 });
    }

    await fs.writeFile(LAYOUT_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, layout: body });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save layout" }, { status: 500 });
  }
}
