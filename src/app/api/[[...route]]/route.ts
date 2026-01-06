import { httpHandler } from "@/server"
import { NextRequest } from "next/server"

export const runtime = "edge"

export const GET = (req: NextRequest) => httpHandler(req, {} as any)
export const POST = (req: NextRequest) => httpHandler(req, {} as any)
