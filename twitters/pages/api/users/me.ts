import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";
import db from "../../../lib/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    const user = await db.user.findUnique({
      where: { id: req.session.user?.id },
    });

    if (user) {
      const { password, ...userWithOutPassword } = user;
      return res.json({ ok: true, profile: userWithOutPassword });
    }

    return res.json({ ok: false });
  } catch (error) {
    console.error(error);
    return res.json({ ok: false });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);
