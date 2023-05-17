import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";
import db from "../../../lib/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { title, body },
    session: { user },
  } = req;

  try {
    const loginUser = await db.user.findUnique({ where: { id: user?.id } });
    if (loginUser) {
      const tweet = await db.tweet.create({
        data: {
          title,
          body,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      return res.json({ ok: true, id: tweet.id });
    }

    return res.json({ ok: false, message: "failed to create tweet" });
  } catch (error) {
    console.error(error);
    return res.json({ ok: false, message: "failed to create tweet" });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
