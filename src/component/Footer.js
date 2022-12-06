import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { off, onValue, ref } from "firebase/database";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "src/firebase";
import styled from "styled-components";
const FooterBox = styled.div`
  border-top: 1px solid #ddd;
  .content_box {
    width: 100%;
    padding-top: 1rem;
    max-width: 1400px;
    margin: 0 auto;
    .logo {
      width: 100px;
      margin-right: 80px;
    }
    .footer_con {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
    }
  }
`;

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <FooterBox>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>개인정보 처리방침(privacy policy)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            본 사이트는 google의 개인정보 보호 및 약관을 따르고 있으며 가입시
            임의로 기입되는 정보는 로그인을 위한 용도 이외의 어떠한 목적으로도
            이용되지 않습니다.
            <br />
            <a
              style={{
                marginTop: "10px",
                display: "block",
              }}
              href="https://policies.google.com/privacy"
            >
              google 정책 보러가기
            </a>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="content_box">
        <div className="footer_con">
          <button
            onClick={onOpen}
            style={{
              letterSpacing: "-1px",
              display: "block",
              color: "#555",
              marginBottom: "8px",
            }}
          >
            개인정보 처리방침(privacy policy)
          </button>
          © Copyright 2022 All rights reserved by sy_dev
        </div>
      </div>
    </FooterBox>
  );
}
