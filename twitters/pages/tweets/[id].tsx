import useSWR from "swr";
import { useRouter } from "next/router";
import { Tweet } from "@prisma/client";
import Layout from "../../components/layout";
import useUser from "../../lib/client/useUser";

interface TweetResponse {
  ok: boolean;
  message?: string;
  tweet: Tweet;
}

export default function TweetDetail() {
  const { user } = useUser();
  const router = useRouter();
  const { data } = useSWR<TweetResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  return (
    <Layout seoTitle="Tweet Detail">
      <div className="mt-5">
        <h1 className="text-xl text-gray-700">{data?.tweet?.title}</h1>
        <div className="flex items-center gap-2">
          <div>
            <span>{user?.name}</span>
          </div>
          <div className="flex-1 p-2">
            <p className=" my-6 border-l-2 text-bold pl-2">
              {data?.tweet?.body}
            </p>
          </div>
        </div>
        <div className="flex pr-4">
          <button className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
}
