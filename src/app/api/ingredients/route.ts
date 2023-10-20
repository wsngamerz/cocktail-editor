import { type NextRequest, NextResponse } from "next/server";
import { getIngredients } from "@/lib/utils";

export const GET = (req: NextRequest, res: NextResponse): NextResponse => NextResponse.json(getIngredients());