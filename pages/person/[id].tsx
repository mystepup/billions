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
    <div>
      {data?.billion?.squareImage !== 'https:undefined' &&
      data?.billion.squareImage ? (
        <Image
          width={48}
          height={48}
          src={data?.billion?.squareImage}
          placeholder="blur"
          blurDataURL="/blur.png"
        />
      ) : (
        <div></div>
      )}
      <div>{data?.billion?.name}</div>
      <div>{data?.billion?.state}</div>
      <div>{data?.billion?.city}</div>
      <div>{data?.billion?.country}</div>
      <div>{data?.billion?.position}</div>
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
