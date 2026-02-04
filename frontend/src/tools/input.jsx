export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={label}
          className="block text-blue-100 text-sm md:text-lg mb-2">
          {label}
        </label>
      )}

      <input
        value={value}
        onChange={onChange}
        type={type}
        id={label}
        placeholder={placeholder}
        required
        className={
          className ||
          "w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/90 text-base md:text-lg outline-none text-blue-900"
        }
      />
    </div>
  );
}
