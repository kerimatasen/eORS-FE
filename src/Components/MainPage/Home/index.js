import React from "react";
import { Carousel, Image, Button } from "antd";
import background from "../../../assets/background.png"; // img1'i import ettik

const contentStyle = {
  height: "100%",
  background: "#364d79",
  maxHeight: "680px",
};
const ContactPage = () => {
  return (
    <Carousel autoplay arrows infinite={false}>
      <div>
        <div style={contentStyle}>
          <Image src={background} preview={false} />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
          />
        </div>
      </div>
    </Carousel>
  );
};

export default ContactPage;
