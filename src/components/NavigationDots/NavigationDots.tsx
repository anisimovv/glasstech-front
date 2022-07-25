type Props = {
  length: number;
  current: number;
};

export const NavigationDots = ({ length, current }: Props) => {
  const arrFromLength = Array.from(Array(length).keys());

  return (
    <div className="flex">
      {arrFromLength.map((element) => {
        return (
          <div
            key={element}
            className={`h-[6px] w-[6px] rounded-full transition-colors ${
              element === current
                ? "bg-cyan-500"
                : "bg-cyan-50 border border-cyan-100"
            } mx-1`}
          />
        );
      })}
    </div>
  );
};
