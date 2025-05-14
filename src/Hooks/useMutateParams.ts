import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useMutateParams = () => {
  const params = useSearchParams();
  return useCallback(
    (mutator: ParamsMutator) => {
      const nextParams = new URLSearchParams(params);
      mutator(nextParams);
      const paramsString = nextParams.toString();
      return paramsString.length ? `?${paramsString}` : "";
    },
    [params],
  );
};

export type ParamsMutator = (params: URLSearchParams) => void;
