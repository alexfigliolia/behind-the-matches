import { BoundedContent } from "Components/BoundedContent";
import { PageHeading } from "Components/PageHeading";
import { Section } from "Components/Section";
import { Propless } from "Types/React";
import { InquiryForm } from "./InquiryForm";
import "./styles.scss";

export default function Contact(_: Propless) {
  return (
    <main className="contact-page">
      <BoundedContent>
        <Section>
          <PageHeading>Contact</PageHeading>
          <div className="contact-form">
            <div>
              <p>
                Have a collection or looking for something special? Let us help
                tell the story.
              </p>
              <p>
                <strong>Contact Us.</strong>
              </p>
            </div>
            <InquiryForm />
          </div>
        </Section>
      </BoundedContent>
    </main>
  );
}
