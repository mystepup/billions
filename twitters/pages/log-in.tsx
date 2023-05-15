import { useForm } from "react-hook-form";
import Input from "../components/Input";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onValid = () => {};
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
          {/*<div className="m-auto rounded-md bg-[#1D9BF0] px-3 py-1.5 inline-block text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">*/}
          {/*  <svg*/}
          {/*      className="h-5 w-5"*/}
          {/*      aria-hidden="true"*/}
          {/*      fill="currentColor"*/}
          {/*      viewBox="0 0 20 20"*/}
          {/*  >*/}
          {/*    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />*/}
          {/*  </svg>*/}
          {/*</div>*/}
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
            <a
              href="#"
              className="font-semibold leading-6 text-[#1D9BF0] hover:text-blue-300"
            >
              Sign up for more!
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
