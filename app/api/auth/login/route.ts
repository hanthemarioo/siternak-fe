import { NextRequest, NextResponse } from "next/server";

const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
    : "http://localhost:8000/api/v1";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${LARAVEL_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // Return user data (without exposing token to client-side JavaScript)
        const res = NextResponse.json({
            message: data.message,
            user: data.user,
        });

        // Set token as HttpOnly cookie — inaccessible from JavaScript, immune to XSS
        res.cookies.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day (in seconds)
        });

        return res;
    } catch (error) {
        console.error("[AUTH_LOGIN_ERROR]", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
