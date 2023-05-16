import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../lib/server/withHandler";
import db from "../../lib/server/db";
import { withApiSession } from "../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (user.password === password) {
        req.session.user = {
          id: user.id,
        };
        await req.session.save();
        return res.json({ ok: true });
      }
    }
    return res.json({ ok: false, message: "failed to login" });
  } catch (error) {
    console.error(error);
    return res.json({ ok: false, message: "failed to login" });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
