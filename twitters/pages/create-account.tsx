import { useForm } from "react-hook-form";
import Input from "../components/Input";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface CreateAccountForm {
  name: string;
  email: string;
  password: string;
}

interface CreateAccountResponse {
  ok: boolean;
  message?: string;
}

const CreateAccount = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateAccountForm>();
  const [createAccount, { loading, data }] = useMutation<CreateAccountResponse>(
    "/api/create-account"
  );

  const onValid = ({ name, email, password }: CreateAccountForm) => {
    if (loading) {
      return;
    }
    console.log(name, email, password);
    createAccount({ name, email, password });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.replace("/log-in");
    }
  }, [data]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for Twitter
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onValid)}>
          <Input
            register={register("name")}
            name="name"
            label="Name"
            required
          />

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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
