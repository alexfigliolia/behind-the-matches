import { useCallback, useEffect, useId, useState } from "react";
import { TrapStack } from "./TrapStack";

export const useTrapStack = (active: boolean) => {
  const ID = useId();
  const [isTop, setIsTop] = useState(false);

  const onStackEntry = useCallback(
    (entry: string | undefined) => {
      setIsTop(entry === ID);
    },
    [ID],
  );

  useEffect(() => {
    if (!active) {
      return;
    }
    const subscriptionID = TrapStack.subscribe(onStackEntry);
    const stackID = TrapStack.push(ID);
    return () => {
      TrapStack.delete(stackID);
      TrapStack.unsubscribe(subscriptionID);
    };
  }, [active, ID, onStackEntry]);

  return active && isTop;
};
