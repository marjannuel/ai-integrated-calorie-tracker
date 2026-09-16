import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest){
    let supabaseResponse = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll(){
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet){
                    cookiesToSet.forEach(({name, value}) => {
                        request.cookies.set(name, value);
                        supabaseResponse.cookies.set(name, value);
                    });
                }
            }
        }
    )
    const { data } = await supabase.auth.getClaims();

    const pathname = request.nextUrl.pathname

    const protectedRoutes = ['/dashboard', '/setup']

    if (!data?.claims && protectedRoutes.includes(pathname)) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
    }

    if (data?.claims && !protectedRoutes.includes(pathname)) {
            return NextResponse.redirect(
                new URL("/setup", request.url)
            );
    }

    return supabaseResponse;

}