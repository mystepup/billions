import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useMutation from "../lib/client/useMutation";
import { useEffect } from "react";

interface CreateAccountMutation {
  ok: boolean;
}

interface CreateAccountForm {
  name: string;
  email: string;
  password: string;
}

const CreateAccount = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountForm>();
  const [createAccount, { loading, data }] = useMutation<CreateAccountMutation>(
    "/api/create-account"
  );

  useEffect(() => {
    if (data && data.ok) {
      router.replace("/log-in");
    }
  }, [data, router]);

  const onValid = async ({ name, email, password }: CreateAccountForm) => {
    if (loading) return;
    createAccount({ name, email, password });
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          name:{" "}
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Please write down your name",
              },
            })}
          />
          <span>{errors?.name?.message}</span>
        </div>
        <div>
          Email:{" "}
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Please write down your email",
              },
            })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <div>
          Password:
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Please write down your password",
              },
            })}
          />
          <span>{errors?.password?.message}</span>
        </div>
        <div>
          <button>Signup</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
