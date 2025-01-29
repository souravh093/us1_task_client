import toast, { Toast } from "react-hot-toast";
import { CheckCircle, XCircle, X } from "lucide-react";

export const showToast = (
  type: "success" | "error",
  message: string
) => {
  toast.custom((t: Toast) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg flex items-center p-4 border-l-4 
      ${type === "success" ? "border-green-500" : "border-red-500"}`}
    >
      {type === "success" ? (
        <CheckCircle className="text-green-500 w-6 h-6" />
      ) : (
        <XCircle className="text-red-500 w-6 h-6" />
      )}
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900">
          {type === "success" ? "Success" : "Error"}
        </p>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  ));
};