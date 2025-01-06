export default function IconGrid() {
  const colorClasses = [
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-purple-400",
    "bg-purple-300",
    "bg-purple-200",
    "bg-purple-100",
  ];

  return (
    <div className="grid grid-cols-8 gap-8 mt-[100px]">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`w-[100px] aspect-square ${colorClasses[index]} rounded-lg shadow 
                        hover:scale-110 hover:brightness-90 transition-all duration-100 ease-in-out`}
        />
      ))}
    </div>
  );
}
