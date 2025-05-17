import dynamic from "next/dynamic";

export const Checkout = dynamic(() =>
  import("./Checkout").then(v => ({ default: v.Checkout })),
);
