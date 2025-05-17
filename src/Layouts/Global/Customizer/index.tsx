import dynamic from "next/dynamic";

export const Customizer = dynamic(() =>
  import("./Customizer").then(v => v.Customizer),
);
