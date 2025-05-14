import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ParamsMutator, useMutateParams } from "./useMutateParams";

export const useReplaceSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const mutator = useMutateParams();
  return useCallback(
    (mutation: ParamsMutator) => {
      const nextParams = mutator(mutation);
      router.replace(`${pathname}${nextParams}`, { scroll: false });
    },
    [router, pathname, mutator],
  );
};
