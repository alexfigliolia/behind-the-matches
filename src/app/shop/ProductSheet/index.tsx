import dynamic from "next/dynamic";

export const ProductSheet = dynamic(() =>
  import("./ProductSheet").then(v => v.ProductSheet),
);
