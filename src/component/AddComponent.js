import React, { useEffect, useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { Notice, ApplyList } from "./CommonStyled";
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
  Box,
} from "@chakra-ui/react";
import { db } from "src/firebase";
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  set,
  off,
  remove,
  limitToLast,
  update,
  limitToFirst,
  runTransaction,
} from "firebase/database";
import { format } from "date-fns";
import LoginLayout from "@component/LoginLayout";
import shortid from "shortid";
import GoogleAd from "./GoogleAd";
import { useSelector } from "react-redux";

export default function AddComponent() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  const [replyData, setReplyData] = useState();
  useEffect(() => {
    if (userInfo) {
      let rRef = query(
        ref(db, `apply`),
        orderByChild("userUid"),
        equalTo(userInfo.uid)
      );
      if (userInfo.admin) {
        rRef = query(ref(db, `apply`), orderByChild("date"), limitToLast(30));
      }
      onValue(rRef, (data) => {
        let arr = [];
        for (const key in data.val()) {
          arr.push({ ...data.val()[key], uid: key });
        }
        arr.sort((a, b) => b.date - a.date);
        setReplyData(arr);
      });
    }
    return () => {
      if (userInfo) {
        off(query(ref(db, `apply`)));
      }
    };
  }, [userInfo]);

  const onResetField = () => {
    resetField("emoticon");
    resetField("info");
  };

  const onRemove = (uid) => {
    const agree = confirm("삭제하시겠습니까?");
    if (agree) {
      const rRef = ref(db, `apply/${uid}`);
      remove(rRef).then(() => {
        toast({
          position: "top",
          description: `삭제되었습니다.`,
          status: "success",
          duration: 1000,
          isClosable: false,
        });
      });
    }
  };

  const onFinish = (uid) => {
    const rRef = ref(db, `apply/${uid}/finish`);
    runTransaction(rRef, (pre) => {
      return !pre;
    }).then(() => {
      toast({
        position: "top",
        description: `업데이트 되었습니다.`,
        status: "success",
        duration: 1000,
        isClosable: false,
      });
    });
  };

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      const uid = shortid.generate();
      const eRef = ref(db, `apply/${uid}`);
      if (values.emoticon.length > 500) {
        toast({
          position: "top",
          description: `이모티콘은 500자 이내로 입력해 주세요.`,
          status: "error",
          duration: 1000,
          isClosable: false,
        });
        return;
      }
      if (values.info.length > 100) {
        toast({
          position: "top",
          description: `설명은 200자 이내로 입력해 주세요.`,
          status: "error",
          duration: 1000,
          isClosable: false,
        });
        return;
      }
      set(eRef, {
        ...values,
        userUid: userInfo.uid,
        finish: false,
        date: new Date().getTime(),
      }).then(() => {
        toast({
          position: "top",
          description: `등록 되었습니다.`,
          status: "success",
          duration: 1000,
          isClosable: false,
        });
      });
      onResetField();
      resolve();
    });
  };

  return (
    <>
      <GoogleAd />
      <Notice>
        <Flex alignItems="center">
          <AiOutlineNotification style={{ marginRight: "10px" }} />
          <p>
            이모티콘과 태그를 적어주시면 중복 및 적합성 검토 후 순차적으로
            추가됩니다 :)
          </p>
        </Flex>
      </Notice>

      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
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
            <ApplyList>
              {replyData &&
                replyData.map((el, idx) => (
                  <>
                    <li key={idx} className={el.finish ? "finish" : "ready"}>
                      <Flex alignItems="center">
                        <div className="state">
                          {el.finish ? "완료" : "대기"}
                        </div>
                        <div className="desc">
                          <span className="emo">{el.emoticon}</span>
                          <span className="info">{el.info}</span>
                        </div>
                      </Flex>
                      <div className="right">
                        <span className="date">
                          {format(new Date(el.date), "yyyy-MM-dd hh:mm")}
                        </span>
                        <Button
                          colorScheme="red"
                          size="sm"
                          ml={2}
                          onClick={() => onRemove(el.uid)}
                        >
                          삭제
                        </Button>
                        {userInfo?.admin && (
                          <Button
                            colorScheme="blue"
                            size="sm"
                            ml={2}
                            onClick={() => onFinish(el.uid)}
                          >
                            {el.finish ? "적용 취소" : "적용 완료"}
                          </Button>
                        )}
                      </div>
                    </li>
                  </>
                ))}
            </ApplyList>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
