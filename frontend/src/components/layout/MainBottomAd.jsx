export default function MainBottomAd({
  height = 120,
  className = "",
  children,
}) {
  return (
    <div className={`w-full mt-2 sm:mt-2 ${className}`}>
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ minHeight: `${height}px` }}
      >
        {children || "Bottom Ad Space"}
      </div>
    </div>
  );
}
