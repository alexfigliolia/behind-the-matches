import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useMutateParams } from "./useMutateParams";

export const useOpenCart = () => {
  const nav = useRouter();
  const pathname = usePathname();
  const mutator = useMutateParams();

  return useCallback(() => {
    const params = mutator(p => p.set("cart", "1"));
    nav.replace(`${pathname}${params}`, { scroll: false });
  }, [nav, pathname, mutator]);
};
