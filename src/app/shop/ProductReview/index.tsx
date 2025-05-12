import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const ProductReview = ({ image, review, reverse = false }: Props) => {
  return (
    <figure className={classnames("product-review", { reverse })}>
      <div>
        <img src={image} alt="behind the matches art piece" />
      </div>
      <figcaption>{review}</figcaption>
    </figure>
  );
};

interface Props {
  image: string;
  review: string;
  reverse?: boolean;
}
