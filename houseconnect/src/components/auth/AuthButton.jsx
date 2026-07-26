import { Loader2 } from "lucide-react";

const AuthButton = ({
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
    >
      {loading && <Loader2 size={20} className="animate-spin" />}
      {children}
    </button>
  );
};

export default AuthButton;
