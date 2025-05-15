import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing",
    "/api/tags",
    "/api/get-covers",
    "/api/get-user-info",
    "api/upload-pdf",
    "/about-us",
    "/privacy-policy",
    "/terms-of-service",
    "/categories",
    "/tags",
    "/blog",
    /^\/blog\/.*/, // 匹配 /blog 的所有子路径
    "/explore",
    /^\/categories\/.*/, // 匹配 /categories 的所有子路径
    /^\/tags\/.*/, // 匹配 /tags 的所有子路径
    /^\/detail\/.*/, // 匹配 /cover 的所有子路径
    /^\/api\/auth\/.*/, // 匹配所有认证相关的 API 路由
    /^\/api\/.*/, // 如果您希望所有 API 路由都是公开的，可以使用这个
    "/api/checkout",
    "/api/pay-success",
    "/pay-success",
    "/pay-success/:session_id",
    /^\/studio\/.*/,
    "/api/gen-cover",
    "/gallery",
  ],

  afterAuth(auth, req, evt) {
    console.log("🔐 Auth Middleware - 开始处理认证");
    console.log("🔐 Auth Middleware - 用户ID:", auth.userId);
    console.log("🔐 Auth Middleware - 当前路径:", req.nextUrl.pathname);
    console.log("🔐 Auth Middleware - 是否公开路由:", auth.isPublicRoute);
    console.log("🔐 Auth Middleware - 是否API路由:", auth.isApiRoute);

    if (!auth.userId && !auth.isPublicRoute) {
      console.log("🔐 Auth Middleware - 用户未登录，需要重定向到登录页");
      if (auth.isApiRoute) {
        console.log("🔐 Auth Middleware - API路由返回401");
        return NextResponse.json(
          { code: -2, message: "no auth" },
          { status: 401 }
        );
      } else {
        console.log("🔐 Auth Middleware - 页面路由重定向到登录页");
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }

    if (auth.userId && req.nextUrl.pathname === "/sign-in") {
      console.log("🔐 Auth Middleware - 已登录用户访问登录页，重定向到首页");
      const redirectUrl = new URL("/", req.url);
      redirectUrl.searchParams.set("t", Date.now().toString());
      return NextResponse.redirect(redirectUrl);
    }

    console.log("🔐 Auth Middleware - 认证通过，继续处理请求");
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    '/detail/:path*',
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api)(.*)"
  ],
};
