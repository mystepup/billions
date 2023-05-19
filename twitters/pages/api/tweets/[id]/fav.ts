import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import { withApiSession } from "../../../../lib/server/withSession";
import db from "../../../../lib/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  try {
    const fav = await db.fav.findFirst({
      where: {
        userId: user?.id,
        tweetId: +id,
      },
    });

    if (fav === null) {
      await db.fav.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          tweet: {
            connect: {
              id: +id,
            },
          },
        },
      });
    } else {
      await db.fav.delete({
        where: {
          id: fav.id,
        },
      });
    }
    return res.json({ ok: true });
  } catch (error) {
    res.json({ ok: true });
    console.error(error);
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
