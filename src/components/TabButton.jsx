// components/TabButton.js
export default function TabButton({
  children,
  isActive,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-bold shadow transition
        focus:ring-2 focus:ring-white focus:outline-none
        ${isActive ? "bg-white/70 text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
