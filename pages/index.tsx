import { NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import axios from "axios";

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
  const { data } = useSWR<BillionsResponse>("/api/persons")
  return <div>{data?.billions?.map(billion => <div key={billion.id}>{billion.name}</div>)}</div>
}

const Page: NextPage<{ billions: Billions[] }> = ({ billions }) => {
  return (
    <SWRConfig value={{
      fallback: {
        "/api/persons": {
          ok: true,
          billions
        }
      }
    }}>
      <Home />
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get<Billions[]>("https://billions-api.nomadcoders.workers.dev")
  return {
    props: {
      billions: data
    }
  }
}

export default Page