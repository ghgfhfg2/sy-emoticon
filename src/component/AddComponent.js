import React, { useEffect, useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { Notice } from "./CommonStyled";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { db } from "src/firebase";
import { onValue, orderByChild, query, ref, set } from "firebase/database";
import { format } from "date-fns";
import LoginLayout from "@component/LoginLayout";
import shortid from "shortid";

export default function AddComponent() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [replyData, setReplyData] = useState();
  useEffect(() => {
    const rRef = query(ref(db, `apply`), orderByChild("date"));
    return () => {};
  }, []);

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      const uid = shortid.generate();
      const eRef = ref(db, `apply/${uid}`);
      if (values.emoticon.length > 500) {
        toast({
          description: `이모티콘은 500자 이내로 입력해 주세요.`,
          status: "error",
          duration: 1000,
          isClosable: false,
        });
        return;
      }
      if (values.info.length > 100) {
        toast({
          description: `설명은 200자 이내로 입력해 주세요.`,
          status: "error",
          duration: 1000,
          isClosable: false,
        });
        return;
      }
      set(eRef, {
        ...values,
        date: new Date().getTime(),
      }).then(() => {
        toast({
          description: `등록 되었습니다.`,
          status: "success",
          duration: 1000,
          isClosable: false,
        });
      });
      resolve();
    });
  };

  return (
    <>
      <Notice>
        <Flex alignItems="center">
          <AiOutlineNotification style={{ marginRight: "10px" }} />
          <p>
            이모티콘과 태그를 적어주시면 중복 및 적합성 검토 후 순차적으로
            추가됩니다 :)
          </p>
        </Flex>
      </Notice>

      <form style={{ width: "100vw" }} onSubmit={handleSubmit(onSubmit)}>
        <Flex justifyContent="center" marginTop={10}>
          <Flex
            width="90%"
            maxWidth="1200px"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <FormControl isInvalid={errors.emoticon}>
              <Input
                id="emoticon"
                placeholder="* 이모티콘"
                {...register("emoticon", {
                  required: "이모티콘은 필수항목 입니다.",
                })}
              />
              <FormErrorMessage>
                {errors.emoticon && errors.emoticon.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.info}>
              <Input
                id="info"
                placeholder="이모티콘 설명"
                {...register("info")}
              />
              <FormErrorMessage>
                {errors.info && errors.info.message}
              </FormErrorMessage>
            </FormControl>
            <Flex mt={4} width="100%" justifyContent="center">
              <Button
                mb={2}
                width="100%"
                maxWidth="200px"
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                신청하기
                {isSubmitting}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
