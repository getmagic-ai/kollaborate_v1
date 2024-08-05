import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/brands",
    "/brands/:id",
    "/sign-in",
    "/sign-up",
    "/blogs",
    "/api/brands",
    "/api/bookmarks",
    "/api/webhook",
    "/api/brand",
    "/api/search",
    "/api/email",
    "/ugc",
    "/termsofservice",
    "/privacy"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
