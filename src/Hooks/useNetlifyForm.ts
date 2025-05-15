import { useCallback } from "react";
import { ILoadingStateSetter, useFormState } from "@figliolia/react-hooks";
import { Callback } from "Types/Generics";

export const useNetlifyForm = (onSuccess?: Callback) => {
  const onSubmit = useCallback(
    async (data: FormData, setState: ILoadingStateSetter) => {
      setState("loading", true);
      try {
        const entries = Array.from(data.entries()) as string[][];
        await fetch("/netlifyForms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(entries).toString(),
        });
        setState("success", true);
        onSuccess?.();
      } catch {
        setState("error", true);
      } finally {
        setState("loading", false);
      }
    },
    [onSuccess],
  );

  return useFormState(onSubmit);
};
