import React, { useEffect } from "react";

import { data } from "../data/showers.json";
import { FieldsState, IShower } from "../types";

import { calculateSurfaceArea } from "../utils/calculateSurfaceArea";
import { calculateSurfaceDimentions } from "../utils/calculateSurfaceDimentions";
import { convertToSquareMeters } from "../utils/convertToSquareMeters";

type Props = {};

const calculateShowerPrice = (
  galssSquare: number,
  glassPrice: number,
  bindingPrice: number,
  minPrice: number,
  maxPrice: number
) => {
  const price = galssSquare * glassPrice + bindingPrice;

  if (price < minPrice) {
    return minPrice.toFixed();
  }

  if (price > maxPrice) {
    return maxPrice.toFixed();
  }

  return price.toFixed();
};

const CalculatorPage = (props: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [filedsState, setFiledsState] = React.useState<FieldsState>(null);

  useEffect(() => {
    const elements = data[currentIndex].elements;
    const fields = elements.reduce((obj, item) => {
      return { ...obj, [item.id]: item.defaultValue };
    }, {});

    setFiledsState(fields);
  }, [currentIndex]);

  // @ts-ignore
  const currentShower: IShower = data[currentIndex] as IShower;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFiledsState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { width, height } = calculateSurfaceDimentions(
    filedsState,
    currentShower.elements
  );

  const square = convertToSquareMeters(calculateSurfaceArea(width, height));

  const price = calculateShowerPrice(
    square,
    1800,
    currentShower.bindings[0].price,
    currentShower.minPrice,
    currentShower.maxPrice
  );

  if (!filedsState) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Name - {currentShower.name}</div>
      <div>Fields</div>
      {currentShower.elements.map((element) => {
        return (
          <div key={element.id}>
            <label>
              {element.title}
              <input
                value={filedsState[element.id]}
                name={element.id}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      })}
      <div>
        <strong>square</strong> - {price}
      </div>
    </div>
  );
};

export default CalculatorPage;
