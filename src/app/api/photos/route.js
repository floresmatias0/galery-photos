import { NextResponse } from "next/server"
import fs from "fs"
import path from 'path';

const PHOTOS_PATH = path.join(process.cwd(), '/public')

export async function GET() {
    try {
        const photos = fs.readdirSync(PHOTOS_PATH)

        return NextResponse.json({ data: photos }, { status: 200 })
    } catch (e) {
        console.error(e?.message);
        return NextResponse.json({ message: e?.message }, { status: 400 })
    }
}