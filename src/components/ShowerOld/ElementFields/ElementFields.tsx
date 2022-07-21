import { useEffect, useState } from "react";
import { IElement } from "../../../types";
import { calculateSurfaceArea } from "../../../utils/calculateSurfaceArea";
import { calculateSurfaceDimentions } from "../../../utils/calculateSurfaceDimentions";
import { convertToSquareMeters } from "../../../utils/convertToSquareMeters";

interface ElementFieldsProps {
  elements: IElement[];
  onChange: (surfaceArea: string) => void;
}

interface ElementInputProps {
  id: string;
  title: string;
  minValue?: number;
  maxValue?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ElementInput = ({
  id,
  title,
  value,
  minValue,
  maxValue,
  onChange,
}: ElementInputProps) => {
  return (
    <div>
      <label>
        {title}:{" "}
        <input
          id={id}
          type="text"
          placeholder={title}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

const constructElementsState = (
  elements: IElement[]
): { [key: string]: string } => {
  return elements.reduce((obj, item) => {
    return { ...obj, [item.id]: item.defaultValue };
  }, {});
};

export const ElementFields = ({ elements, onChange }: ElementFieldsProps) => {
  const [state, setState] = useState<{ [key: string]: string }>({});

  // Set initial state
  useEffect(() => {
    const elemetsState = constructElementsState(elements);
    setState(elemetsState);
  }, [elements]);

  // Calculate Surface Area
  useEffect(() => {
    const { width, height } = calculateSurfaceDimentions(state, elements);

    const surfaceArea = convertToSquareMeters(
      calculateSurfaceArea(width, height)
    );

    onChange(surfaceArea.toString());
  }, [state, elements, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div>
      {elements.map((element) => (
        <ElementInput
          key={element.id}
          id={element.id}
          title={element.title}
          value={state[element.id] || ""}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
