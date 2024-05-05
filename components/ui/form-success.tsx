import { TbCircleCheck } from "react-icons/tb";
interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }

  return <div className="bg-emerald-300 p-2 my-4 rounded-md flex items-center gap-x-2 text-sm text-emerald-800"><TbCircleCheck  className="h-5 w-5"/> {message}</div>;
};
