import { Metadata } from "next";
import IStripe from "stripe";
import { BoundedContent } from "Components/BoundedContent";
import { PageHeading } from "Components/PageHeading";
import { Section } from "Components/Section";
import { CustomizeYourOwn, ProductGrid } from "Layouts/Shop";
import { Stripe } from "Tools/Stripe";
import { PageProps } from "Types/React";
import { ProductReview } from "./ProductReview";
import { ProductSheet } from "./ProductSheet";
import { SEO } from "./SEO";
import "./styles.scss";

export const metadata: Metadata = SEO;

export default async function Shop({
  searchParams,
}: PageProps<Record<string, never>, { product: string | undefined }>) {
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
        <div className="reviews">
          <ProductReview
            image="/customer-piece-1.jpg"
            review="“The piece looks amazing — it went up on the wall today and couldn’t be more perfect in the space. Thanks again for your patience and attention to detail, I’m so happy with how it turned out. I’ll definitely be in touch about additional pieces in the future!”"
          />
          <ProductReview
            reverse
            image="/customer-piece-2.png"
            review="“She loved it. Huge success!!!!”"
          />
        </div>
      </Section>
      <ProductSheet product={selectedProduct} />
    </main>
  );
}
