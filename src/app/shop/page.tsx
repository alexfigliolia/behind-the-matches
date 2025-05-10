import { Suspense } from "react";
import IStripe from "stripe";
import { BoundedContent } from "Components/BoundedContent";
import { PageHeading } from "Components/PageHeading";
import { Section } from "Components/Section";
import { CustomizeYourOwn, ProductGrid } from "Layouts/Shop";
import { Stripe } from "Tools/Stripe";
import { PageProps, Propless } from "Types/React";
import { ProductSheet } from "./ProductSheet";
import "./styles.scss";

export default async function Shop({
  searchParams,
}: PageProps<Propless, { product: string | undefined }>) {
  const [products, { product }] = await Promise.all([
    Stripe.getClient().products.list({
      active: true,
      limit: 100,
      expand: ["data.default_price"],
    }),
    searchParams,
  ]);
  let selectedProduct: IStripe.Product | undefined = undefined;
  if (product) {
    selectedProduct = products.data.find(v => v.id === product);
  }
  return (
    <main className="shop-page">
      <Section>
        <BoundedContent>
          <header>
            <PageHeading>Shop</PageHeading>
            <p>
              Each product is <strong>one of kind, hand-made,</strong> and tells
              a <strong>story</strong>
            </p>
            <p>The shop will update periodically with new products</p>
          </header>
          <ProductGrid products={products.data} />
          <CustomizeYourOwn />
        </BoundedContent>
      </Section>
      <Suspense>
        <ProductSheet product={selectedProduct} />
      </Suspense>
    </main>
  );
}
