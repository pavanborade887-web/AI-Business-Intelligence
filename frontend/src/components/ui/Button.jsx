function Button({
  text,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-xl bg-blue-600 p-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;