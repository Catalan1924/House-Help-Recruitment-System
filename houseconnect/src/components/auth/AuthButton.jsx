const AuthButton = ({
  children,
  onClick,
  type = "button"
}) => {

  return (

    <button
      type={type}
      onClick={onClick}
      className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
    >
      {children}
    </button>

  );

};

export default AuthButton;