import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface Billion {
  id: string
  name: string
  squareImage: string
  netWorth: number
  industries: string[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req

  const { data } = await axios.get<Billion>(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`
  )

  return res.json({ ok: true, billion: data })
}

export default handler
