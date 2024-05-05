import { TbAlertTriangle } from "react-icons/tb";
interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return <div className="bg-red-300 p-2 my-4 rounded-md flex items-center gap-x-2 text-sm  text-red-600"><TbAlertTriangle className="h-5 w-5"/> {message}</div>;
};
