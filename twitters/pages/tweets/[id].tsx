import useSWR from "swr";
import { useRouter } from "next/router";

export default function Tweet() {
  const router = useRouter();
  const data = useSWR(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  return <div>hi</div>;
}
