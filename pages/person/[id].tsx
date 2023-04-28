import { NextPage, GetServerSideProps } from 'next'
import useSWR, { SWRConfig } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface FinancialAsset {
  exchange: string
  ticker: string
  companyName: string
  numberOfShares: number
  sharePrice: number
  currencyCode: string
  exchangeRate: number
  interactive: true
  currentPrice: number
}

interface Billion {
  id: string
  name: string
  state: string
  city: string
  country: string
  position: 1
  industries: string[]
  financialAssets: FinancialAsset[]
  thumbnail: string
  squareImage: string
  bio: string[]
  about: string[]
  netWorth: number
}

interface BillionResponse {
  ok: true
  billion: Billion
}

const BillionDetail: NextPage = () => {
  const router = useRouter()
  const { data } = useSWR<BillionResponse>(
    router.query.id ? `/api/person/${router.query.id}` : null
  )
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Billion details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data?.billion?.name}
            </h1>
          </div>
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Billion information
            </h2>
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                $ {data?.billion?.netWorth}
              </p>
              <div className="ml-4 border-l border-gray-300 pl-4">
                <p className="ml-2 text-sm text-gray-500">
                  Ranking {data?.billion?.position}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{data?.billion?.bio}</p>
              <p className="text-base text-gray-500">{data?.billion?.about}</p>
            </div>
          </section>
        </div>

        {/* Billion image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            {data?.billion?.squareImage !== 'https:undefined' &&
            data?.billion.squareImage ? (
              <Image
                layout="intrinsic"
                width="416"
                height="416"
                src={data?.billion?.squareImage}
                placeholder="blur"
                blurDataURL="/blur.png"
              />
            ) : null}
          </div>
        </div>
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-xl tracking-tight text-gray-900 sm:text-xl">
              Financial Assets
            </h1>
            <div className="sm:flex sm:justify-between mt-4">
              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data?.billion?.financialAssets.map((fa) => (
                  <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
                    <p className="text-base font-medium text-gray-900">
                      {fa.companyName}
                    </p>
                    <p className="text-sm text-gray-500">{fa.exchange}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (typeof context.query.id === 'string') {
    if (context.query.id.endsWith('.png')) {
      const { data } = await axios.get<Billion>(
        `https://billions-api.nomadcoders.workers.dev/person/${context.query.id}`
      )
      return {
        props: {
          ok: true,
          billion: data,
        },
      }
    }
  }
  return {
    props: {},
  }
}

export default BillionDetail
