const AuthInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error,
}) => {
  return (
    <div className="space-y-2">
      <label className="font-medium" htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default AuthInput;
