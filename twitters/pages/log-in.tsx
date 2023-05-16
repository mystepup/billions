import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Link from "next/link";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  message?: string;
}

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();
  const [login, { data, loading }] = useMutation<LoginResponse>("/api/log-in");
  const onValid = ({ email, password }: LoginForm) => {
    if (loading) {
      return;
    }
    login({ email, password });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.replace("/");
    }
  }, [data]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onValid)}>
            <Input
              register={register("email")}
              name="email"
              label="Email Address"
              required
            />

            <Input
              register={register("password")}
              name="password"
              label="Password"
              required
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1D9BF0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link href="/create-account">
              <span className="font-semibold cursor-pointer leading-6 text-[#1D9BF0] hover:text-blue-300">
                Sign up for more!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
