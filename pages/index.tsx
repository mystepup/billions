import { NextPage } from "next";
import useSWR from "swr";

interface Billions {
  id: string
  name: string
  squareImage: string
  netWorth: number
  industries: string[]
}

interface BillionsResponse {
  ok: true;
  billions: Billions[]
}

const Home: NextPage = () => {
  const { data } = useSWR<BillionsResponse>("/api/person")
  return <div>{data?.billions?.map(billion => <div key={billion.id}>{billion.name}</div>)}</div>
}

export default Home