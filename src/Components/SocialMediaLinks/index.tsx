import { Fragment } from "react";
import { Instagram } from "Icons/Instagram";
import { Tiktok } from "Icons/Tiktok";
import { Socials } from "Tools/Socials";
import { Propless } from "Types/React";

export const SocialMediaLinks = (_: Propless) => {
  return (
    <Fragment>
      <a
        aria-label="Link to instagram"
        href={Socials.instagram}
        target="_blank">
        <Instagram aria-hidden />
      </a>
      <a aria-label="Link to tiktok" href={Socials.tiktok} target="_blank">
        <Tiktok aria-hidden />
      </a>
    </Fragment>
  );
};
