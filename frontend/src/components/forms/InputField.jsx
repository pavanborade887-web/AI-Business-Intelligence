function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <div className="mb-5">

      {label && (
        <label className="block text-slate-300 mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

        {icon && (
          <span className="text-slate-400 mr-3">
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent p-4 text-white outline-none"
        />

      </div>

    </div>
  );
}

export default InputField;