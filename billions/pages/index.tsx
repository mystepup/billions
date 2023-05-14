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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          World Billions Ranking
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.billions?.map((billion) => (
            <Link href={`/person/${billion.id}`}>
              <div key={billion.id} className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  {billion.squareImage === 'https:undefined' ? null : (
                    <Image
                      layout="responsive"
                      width="280"
                      height="320"
                      src={billion.squareImage}
                      placeholder="blur"
                      blurDataURL="/blur.png"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {billion.name}
                    </h3>
                    <div>
                      {billion.industries?.map((industry) => (
                        <p className="mt-1 text-sm text-gray-500">{industry}</p>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${billion.netWorth}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
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
