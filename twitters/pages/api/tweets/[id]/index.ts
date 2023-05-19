import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import { withApiSession } from "../../../../lib/server/withSession";
import db from "../../../../lib/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    const {
      query: { id },
      session: { user },
    } = req;
    const tweet = await db.tweet.findUnique({
      where: { id: +id },
      include: { user: true },
    });

    const favs = await db.fav.findFirst({
      where: {
        tweetId: +id,
        userId: user?.id,
      },
    });
    return res.json({ ok: true, tweet, isLiked: favs !== null });
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
