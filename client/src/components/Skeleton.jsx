const CardSkeleton = () => {
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex flex-row-reverse justify-between gap-10 items-start">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`rounded-lg h-40 animate-pulse duration-100 bg-zinc-200`}
        ></div>
      ))}
    </div>
  );
};

export default CardSkeleton