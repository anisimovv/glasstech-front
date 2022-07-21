import Input from "../../Input";

type Props = {
  title: string;
  value: string;
};

export const ShowerElementInput = ({ title, ...props }: Props) => {
  return (
    <label className="flex w-full items-center justify-between mb-4 last:mb-0">
      <div>
        <span className="block leading-none text-slate-700">
          {title}
          <span className="block text-sm text-slate-400">x axis, mm</span>
        </span>
      </div>
      <Input width={80} {...props} />
    </label>
  );
};
