import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../lib/server/withHandler";
import db from "../../lib/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, email, password } = req.body;

  try {
    await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.json({ ok: false, message: "failed to create user" });
  }
}

export default handler;
