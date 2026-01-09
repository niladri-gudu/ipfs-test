import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function GET(
    _req: Request,
    { params }: { params: { cid: string } }
) {
    try {
        const { cid } = params;

        const url = await pinata.gateways.public.convert(cid);

        const { contentType } = await pinata.gateways.public.get(cid);

        return NextResponse.json(
            { cid, url, contentType },
            { status: 200 }
        );
    } catch (error) {
        console.error("RETRIEVE ERROR:", error);
        return NextResponse.json(
            { error: "Failed to retrieve file" },
            { status: 500 }
        );
    }
}