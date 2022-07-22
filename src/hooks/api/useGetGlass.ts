import useSWR from "swr";
import { IGlass, IShower } from "../../types";

const query = `{
  glass {
    id
    name
    price
  }
}`;

export const useGetGlass = () => {
  const { data, error, isValidating, mutate } = useSWR<{ glass: IGlass[] }>(
    query
  );

  const glass = data?.glass;

  return { glass, error, isValidating, mutate };
};
