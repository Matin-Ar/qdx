import React from "react";
import locationICON from "../assets/contactus/location.png";
import phoneICON from "../assets/contactus/phone.png";
import mailICON from "../assets/contactus/mail.png";

export default function ContactUsMap() {
  return (
    <div className="contactus-map-wrapper">
      <p className="contactus-map-title">دفتر مرکزی، تهران</p>
      <iframe
        id="contactusMap"
        width="600"
        height="350"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://www.openstreetmap.org/export/embed.html?bbox=48.404663092223934%2C36.62488959676216%2C48.56533814105206%2C36.71012097235828&amp;layer=mapnik&amp;marker=36.66751708364692%2C48.48500061663799"
      ></iframe>
      <div className="contactus-map-info">
        <div className="map-info">
          <img src={locationICON} />
          <span>تهران، فلکه دوم صادقه، برج گلدیس</span>
        </div>
        <div className="map-info">
          <img src={phoneICON} />
          <span>09188148436</span>
        </div>
        <div className="map-info">
          <img src={mailICON} />
          <span>info@qdx.ir</span>
        </div>
      </div>
    </div>
  );
}
