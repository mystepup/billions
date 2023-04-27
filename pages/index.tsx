import { NextPage } from 'next'
import useSWR, { SWRConfig } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

interface Billion {
  id: string
  name: string
  squareImage: string
  netWorth: number
  industries: string[]
}

interface BillionsResponse {
  ok: true
  billions: Billion[]
}

const Home: NextPage = () => {
  const { data } = useSWR<BillionsResponse>('/api/person')
  return (
    <div>
      {data?.billions?.map((billion) => (
        <Link href={`/person/${billion.id}`} key={billion.id}>
          <div>
            <h2>{billion.name}</h2>
            {billion.squareImage === 'https:undefined' ? null : (
              <Image
                width={48}
                height={48}
                src={billion.squareImage}
                placeholder="blur"
                blurDataURL="/blur.png"
              />
            )}
            <div>{billion.netWorth}</div>
            <div>
              {billion.industries?.map((industry) => (
                <span>{industry}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

const Page: NextPage<{ billions: Billion[] }> = ({ billions }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/person': {
            ok: true,
            billions,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get<Billion[]>(
    'https://billions-api.nomadcoders.workers.dev'
  )
  return {
    props: {
      ok: true,
      billions: data,
    },
  }
}

export default Page
