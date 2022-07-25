import { useState } from "react";
import { IElement } from "../../../types";
import Input from "../../Input";
import { useShowerData } from "../shower-context";

interface ShowerElementInputProps {
  title: string;
  element: IElement;
}
const DIGITS_ONLY = /^[0-9\b]+$/;

export const ShowerElementInput = ({
  title,
  element,
  ...props
}: ShowerElementInputProps) => {
  const { dispatch } = useShowerData();
  const [input, setInput] = useState(element.defaultValue || "");

  const handleChange = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    const value = target.value;
    const canInput =
      (DIGITS_ONLY.test(value) && value.length < 5) || value === "";

    if (canInput) {
      setInput(value);
    }
  };

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    const { value, name } = target;

    if (!value) {
      dispatch({
        type: "setShowerElementInput",
        payload: { id: name, value: element.defaultValue.toString() },
      });
      setInput(element.defaultValue.toString());

      return;
    }

    if (+value < element.minValue) {
      dispatch({
        type: "setShowerElementInput",
        payload: { id: name, value: element.minValue.toString() },
      });
      setInput(element.minValue.toString());

      return;
    }

    if (+value > element.maxValue) {
      dispatch({
        type: "setShowerElementInput",
        payload: { id: name, value: element.maxValue.toString() },
      });
      setInput(element.maxValue.toString());

      return;
    }

    dispatch({
      type: "setShowerElementInput",
      payload: { id: name, value },
    });
  };

  const handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    target.select();

  return (
    <label className="flex w-full items-center justify-between mb-4 last:mb-0">
      <div>
        <span className="block leading-none text-slate-700">
          {title}
          <span className="block text-sm text-slate-400">
            {`${element.minValue}-${element.maxValue}, mm`}
          </span>
        </span>
      </div>
      <Input
        width={80}
        value={input}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name={element.id}
        inputMode="numeric"
        {...props}
      />
    </label>
  );
};
