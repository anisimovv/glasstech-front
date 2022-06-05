import React from "react";
import { IShower } from "../types";

type Props = {};

const initialState: Omit<IShower, "id"> = {
  name: "",
  maxPrice: 0,
  minPrice: 0,
  bindings: [],
  elements: [],
};

const AddShower = (props: Props) => {
  const [state, setState] = React.useState<Omit<IShower, "id">>(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddElement = () => {
    setState((prevState) => ({
      ...prevState,
      elements: [
        ...prevState.elements,
        {
          id: prevState.elements.length.toString(),
          title: "",
          defaultValue: 0,
          maxValue: 0,
          minValue: 0,
          type: "WIDTH",
        },
      ],
    }));
  };

  return (
    <div>
      <div>
        <label>
          Name:{" "}
          <input name="name" onChange={handleInputChange} value={state.name} />
        </label>
      </div>
      <div>
        <label>
          Price:{" "}
          <input
            name="maxPrice"
            onChange={handleInputChange}
            value={state.maxPrice}
          />
        </label>
      </div>
      <div>
        <label>
          Price:{" "}
          <input
            name="minPrice"
            onChange={handleInputChange}
            value={state.minPrice}
          />
        </label>
      </div>
      <hr />
      <h3>Elements</h3>
      {state.elements.map((element) => {
        return (
          <div key={element.id}>
            <label>
              Title:
              <input
                type="text"
                onChange={handleInputChange}
                value={state.elements[element.id.toString()].title}
              />
            </label>
            <label>
              Default Value:
              <input
                type="text"
                onChange={handleInputChange}
                value={state.elements[element.id].defaultValue}
              />
            </label>
            <label>
              Max Value:
              <input
                type="text"
                onChange={handleInputChange}
                value={state.elements[element.id].maxValue}
              />
            </label>
            <label>
              Min Value:
              <input
                type="text"
                onChange={handleInputChange}
                value={state.elements[element.id].minValue}
              />
            </label>
            <hr />
          </div>
        );
      })}
      <button onClick={handleAddElement}>Add element</button>
    </div>
  );
};

export default AddShower;
