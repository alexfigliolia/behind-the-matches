import IStripe from "stripe";
import { AddToCartButton } from "Components/AddToCartButton";
import { BoundedContent } from "Components/BoundedContent";
import { PageHeading } from "Components/PageHeading";
import { ProductPrice } from "Components/ProductPrice";
import { Section } from "Components/Section";
import { Slider } from "Components/Slider";
import { Stripe } from "Tools/Stripe";
import { PageProps } from "Types/React";
import "./styles.scss";

export default async function ProductPage({
  params,
}: PageProps<{ product: string }>) {
  const { product } = await params;
  const item = await Stripe.getClient().products.retrieve(product, {
    expand: ["default_price"],
  });
  const price = item.default_price as IStripe.Price;
  if (!price.unit_amount) {
    return null;
  }
  return (
    <main className="product-page">
      <Section>
        <BoundedContent>
          <div className="listing">
            <div className="meta">
              <PageHeading>{item.name}</PageHeading>
              <ProductPrice price={price} />
              <AddToCartButton />
            </div>
            <Slider controls={item.images.length > 1}>
              {item.images.map(img => (
                <div key={img}>
                  <img src={img} alt={item.name} />
                </div>
              ))}
            </Slider>
            <AddToCartButton />
          </div>
        </BoundedContent>
      </Section>
    </main>
  );
}
