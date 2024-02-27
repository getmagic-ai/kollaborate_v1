import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
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
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
