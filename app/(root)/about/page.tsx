import React from "react";

const page = () => {
  return (
    <div className="mx-auto w-[85%]">
      <p className="text-[35px] font-medium font-inter mb-3 text-center">
        About Us
      </p>
      <div className="flex flex-col text-[16px] text-[#666] gap-3">
        <span>
          Welcome to Exclusive, your one-stop-shop for all your computer
          hardware needs. Our company was founded in [2000] with the goal of
          providing high-quality computer hardware products at affordable prices
          to the people of Egypt.
        </span>
        <span>
          At Exclusive, we are committed to providing our customers with the
          best shopping experience possible. We offer a wide selection of
          computer hardware products from top brands such as [ASUS], [GIGABYTE],
          and [SAMSUNG]. Whether you are looking for a new computer case,
          motherboard, or graphics card, we have everything you need to build
          your dream PC.
        </span>
        <span>
          Our team of knowledgeable and friendly staff is always ready to help
          you with any questions you may have. We pride ourselves on our
          excellent customer service and strive to make every interaction with
          our customers a positive one.
        </span>
        <span>
          In addition to our top-quality products and customer service, we also
          offer competitive prices and fast shipping to ensure that our
          customers receive their orders as quickly and affordably as possible.
        </span>
        <span>
          Thank you for choosing Exclusive as your go-to computer hardware
          store. We look forward to serving you and helping you build the
          computer of your dreams.
        </span>
      </div>
    </div>
  );
};

export default page;
