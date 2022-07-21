type Props = {
  value: any;
  width: number;
};

export const Input = ({ value, width, ...props }: Props) => {
  return (
    <input
      value={value}
      className="border border-slate-300 h-10 rounded-lg px-4 text-right"
      style={{ width: width || "100%" }}
      {...props}
    />
  );
};
