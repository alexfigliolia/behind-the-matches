import dynamic from "next/dynamic";

export const BookAWorkShop = dynamic(() =>
  import("./BookAWorkShop").then(v => v.BookAWorkShop),
);
