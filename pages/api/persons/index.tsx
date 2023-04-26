import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

interface Billions {
    id: string
    name: string
    squareImage: string
    netWorth: number
    industries: string[]
}

async function handler(req: NextApiRequest, res:NextApiResponse) {
    const { data } = await axios.get<Billions[]>('https://billions-api.nomadcoders.workers.dev')
    return res.json({ ok: true, billions: data })
}

export default handler;