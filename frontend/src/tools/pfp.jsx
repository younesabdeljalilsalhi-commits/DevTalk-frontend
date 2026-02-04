export default function Pfp({ Src, Alt, Size = "medium", Active }) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className={`relative ${sizeClasses[Size]}`}>
      <img
        src={Src}
        alt={Alt}
        className="w-full h-full rounded-full object-cover"
      />
      {Active === "Online" && (
        <span className="absolute inset-0 rounded-full ring-2 ring-green-500" />
      )}
    </div>
  );
}
