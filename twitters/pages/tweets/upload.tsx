import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import useMutation from "../../lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface UploadForm {
  title: string;
  body: string;
}

interface UploadResponse {
  ok: boolean;
  message?: string;
  id: string;
}

export default function Upload() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadForm>();
  const [uploadTweet, { loading, data }] =
    useMutation<UploadResponse>("/api/tweets");

  const onValid = ({ title, body }: UploadForm) => {
    if (loading) return;
    uploadTweet({ title, body });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.replace(`/tweets/${data?.id}`);
    }
  }, [data]);

  return (
    <Layout seoTitle={"Upload Tweet"}>
      <div className="p-4">
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            register={register("title")}
            label={"Title"}
            name={"title"}
            required
          />
          <label
            htmlFor="body"
            className="m-1 block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            {...register("body")}
            className="block m-1 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 resize-none"
            rows={4}
          />
          <div>
            <button
              type="submit"
              className="flex my-4 w-full justify-center rounded-md bg-[#1D9BF0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
