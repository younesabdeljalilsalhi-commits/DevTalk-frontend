export default function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="w-full max-w-64">
      <label htmlFor={label} className="block text-blue-100 text-xl mb-1 -ml-8">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        type={type}
        id={label}
        placeholder={placeholder}
        required
        className="-ml-8 px-16 py-5 mb-3.5 border-none rounded-3xl bg-white/90 text-xl text-center outline-none text-blue-900"
      />
    </div>
  );
}
