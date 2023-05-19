import React from "react";
import Layout from "../components/layout";
import useSWR from "swr";
import TweetItem from "../components/TweetItem";
import { Tweet, User } from "@prisma/client";
import Link from "next/link";

interface TweetsResponse {
  ok: boolean;
  message?: string;
  tweets: TweetWithUser[];
}

export interface TweetWithUser extends Tweet {
  user: User;
  _count: {
    favs: number;
  };
}

const Home = () => {
  const { data } = useSWR<TweetsResponse>("/api/tweets");

  return (
    <Layout seoTitle="Home">
      <div className="flex flex-col gap-2 px-8 py-2">
        {data?.tweets.map((tweet: TweetWithUser) => (
          <Link key={tweet.id} href={`/tweets/${tweet.id}`}>
            <a>
              <TweetItem tweet={tweet} />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
