import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file = data.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided!" },
                { status: 400 }
            )
        }

        const upload = await pinata.upload.public.file(file);

        const url = await pinata.gateways.public.convert(upload.cid);

        return NextResponse.json(
            { cid: upload.cid, url },
            { status: 200 }
        )
    } catch (error) {
        console.error("Upload Error", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        )
    }
}