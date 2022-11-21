import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Loading from "./Loading";
import Footer from "./Footer";
import styled from "styled-components";
import { AiOutlineNotification, AiOutlineToTop } from "react-icons/ai";
import { Notice, BtnTop } from "./CommonStyled";

export default function MainLayout({ children, logoImg }) {
  const logoUrl = useSelector((state) => state.logo.url);
  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="wrapper">
        <Header logoImg={logoUrl} />
        {/* <Notice>
          <AiOutlineNotification />
        </Notice> */}
        {children ? (
          <main>{children}</main>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <Loading />
          </Flex>
        )}
        <BtnTop onClick={moveTop}>
          <AiOutlineToTop />
        </BtnTop>
        <Footer />
      </div>
    </>
  );
}
