import React from "react";
import ContactForm from "./ContactForm";
import ContactUsMap from "./ContactUsMap";
import Social from "./Social";

export default function ContactUsPage() {
  return (
    <div className="contactUsPage-wrapper">
      <ContactForm />
      <ContactUsMap />
      <Social />
    </div>
  );
}
