import React from "react";
import { TweetWithUser } from "../pages";

interface TweetProps {
  tweet: TweetWithUser;
}

export default function TweetItem({ tweet }: TweetProps) {
  return (
    <div className="flex border items-center border-gray px-4 py-1 rounded-md shadow hover:shadow-lg cursor-pointer">
      <div className="flex-1">
        <h2 className="font-bold text-md">{tweet.title}</h2>
        <div className="italic">{tweet.user.name}</div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-red-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>
          <span>{tweet._count.favs}</span>
        </div>
      </div>
    </div>
  );
}
