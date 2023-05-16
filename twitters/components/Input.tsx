import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  required: boolean;
  register: UseFormRegisterReturn;
}

const Input = ({ label, name, register, required }: InputProps) => {
  return (
    <div>
      <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          type={name}
          {...register}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
