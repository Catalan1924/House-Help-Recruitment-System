const AuthInput = ({
  label,
  type,
  placeholder,
}) => {
  return (
    <div className="space-y-2">

      <label className="font-medium">

        {label}

      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
      />

    </div>
  );
};

export default AuthInput;