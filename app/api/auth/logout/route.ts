import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
    : "http://localhost:8000/api/v1";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // Call Laravel logout to revoke the token server-side
        if (token) {
            await fetch(`${LARAVEL_BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        const res = NextResponse.json({ message: "Logged out successfully." });

        // Clear the HttpOnly cookie
        res.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0, // Expire immediately
        });

        return res;
    } catch (error) {
        console.error("[AUTH_LOGOUT_ERROR]", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
