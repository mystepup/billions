import { NextMiddleware, NextRequest, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req: NextRequest) => {
  if (!req.url.includes("/api")) {
    if (!req.cookies.twitterLoginSession) {
      if (!req.url.includes("/create-account") && !req.url.includes("/log-in"))
        return NextResponse.redirect(new URL("log-in", req.url));
    }
  }
};
