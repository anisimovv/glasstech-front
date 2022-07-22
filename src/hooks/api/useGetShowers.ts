import useSWR from "swr";
import { IShower } from "../../types";

const query = `{
   showers {
     id
     name
     minPrice
     maxPrice
     elements {
       id
       title
       maxValue
       minValue
       defaultValue
       type
     }
     bindings {
       id
       title
       price
     }
   }
}`;

export const useGetShowers = () => {
  const { data, error, isValidating, mutate } = useSWR<{ showers: IShower[] }>(
    query
  );

  const showers = data?.showers;

  return { showers, error, isValidating, mutate };
};
