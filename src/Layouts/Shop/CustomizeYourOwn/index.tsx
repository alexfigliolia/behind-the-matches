import { ButtonLink } from "Components/ButtonLink";
import { Propless } from "Types/React";
import "./styles.scss";

export const CustomizeYourOwn = (_: Propless) => {
  return (
    <div className="customize-your-own">
      <h2>Not finding your fit?</h2>
      <ButtonLink text="Customize Your Own" href="/customize" />
    </div>
  );
};
