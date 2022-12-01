import { useEffect, useState } from "react";
import { setUser } from "@redux/actions/user_action";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { db } from "../firebase";
import {
  ref,
  set,
  update,
  runTransaction,
  onValue,
  off,
} from "firebase/database";
import { dbData, tagList } from "./db";
import { Button, Flex, Input, Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmoticonList,
  TagListBox,
  H2Style,
  Notice,
} from "@component/CommonStyled";
import GoogleAd from "./GoogleAd";
import { AiOutlineNotification } from "react-icons/ai";

export default function Main() {
  const toast = useToast();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);

  const [type, setType] = useState("");
  const typeSort = (type) => {
    setType(type);
  };

  const [emoticonList, setEmoticonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let arr = [];
    setIsLoading(true);
    const getEmoList = new Promise((resolve) => {
      arr = dbData.map((el) => {
        if (userInfo && userInfo.favor?.includes(el.uid)) {
          el.favor = 1;
        } else {
          el.favor = 0;
        }
        return el;
      });
      if (type) {
        arr = arr.filter((el) => el.tag === type);
      }
      setTimeout(() => {
        resolve(arr);
      }, 100);
    });
    getEmoList.then((res) => {
      setIsLoading(false);
      setEmoticonList(res);
    });
  }, [userInfo, type]);

  const onCopy = (el) => {
    navigator.clipboard.writeText(el.emo);
    toast({
      position: "top",
      description: `${el.emo} 가 복사 되었습니다.`,
      status: "success",
      duration: 1000,
      isClosable: false,
    });
  };

  const onFavor = (el) => {
    if (!userInfo) {
      toast({
        position: "top",
        description: `로그인이 필요합니다.`,
        status: "info",
        duration: 1000,
        isClosable: false,
      });
      return;
    }
    const fRef = ref(db, `user/${userInfo.uid}/favor`);
    let newFavor;
    runTransaction(fRef, (pre) => {
      if (pre) {
        newFavor = [...pre];
        if (pre.find((list) => list === el.uid)) {
          newFavor = newFavor.filter((e) => e !== el.uid);
          toast({
            position: "top",
            description: `${el.emo} 즐찾 취소 되었습니다.`,
            status: "success",
            duration: 1000,
            isClosable: false,
          });
        } else {
          newFavor = [...pre, el.uid];
          toast({
            position: "top",
            description: `${el.emo} 즐찾 추가 되었습니다.`,
            status: "success",
            duration: 1000,
            isClosable: false,
          });
        }
      } else {
        newFavor = [el.uid];
        toast({
          position: "top",
          description: `${el.emo} 즐찾 추가 되었습니다.`,
          status: "success",
          duration: 1000,
          isClosable: false,
        });
      }
      let newUser = { ...userInfo };
      newUser.favor = newFavor;
      dispatch(setUser(newUser));
      return newFavor;
    });
  };

  const [ranEmoNum, setRanEmoNum] = useState();
  const randomEmoticon = () => {
    let num = Math.floor(Math.random() * emoticonList.length) + 1;
    setRanEmoNum(num);
  };

  return (
    <div className="content_box">
      <GoogleAd />
      {isLoading && (
        <Spinner
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}
      <Flex alignItems="flex-start">
        <AiOutlineNotification
          style={{ marginTop: "3px", marginRight: "10px" }}
        />
        <Flex flexDirection="column">
          <p>
            - 이모티콘 신청을 통해 새로운 이모티콘이 계속 추가 될 예정입니다 :)
          </p>
          <p>- 감정 태그는 현재 업데이트 진행중 입니다. </p>
        </Flex>
      </Flex>
      <TagListBox>
        {tagList && (
          <>
            <Button
              onClick={() => typeSort("")}
              margin={1}
              colorScheme="blue"
              variant={type === "" ? "solid" : "outline"}
            >
              전체
            </Button>
            {tagList.map((el, idx) => (
              <>
                <Button
                  onClick={() => typeSort(el)}
                  margin={1}
                  colorScheme="blue"
                  variant={type === el ? "solid" : "outline"}
                >
                  {el}
                </Button>
              </>
            ))}
          </>
        )}
      </TagListBox>
      <H2Style>특수문자 이모티콘</H2Style>
      <Flex justifyContent="center" alignContent="center" mb={2}>
        <Button onClick={randomEmoticon}>랜덤으로 뽑아보기</Button>
        <EmoticonList style={{ marginLeft: "5px" }}>
          {emoticonList && ranEmoNum && (
            <li key={emoticonList[ranEmoNum].uid} style={{ margin: "0" }}>
              <button
                type="button"
                className="btn_emo"
                onClick={() => onCopy(emoticonList[ranEmoNum])}
              >
                {emoticonList[ranEmoNum].emo}
              </button>
              <button
                type="button"
                className="btn_favor"
                onClick={() => onFavor(emoticonList[ranEmoNum])}
              >
                {emoticonList[ranEmoNum].favor ? (
                  <MdFavorite />
                ) : (
                  <MdFavoriteBorder />
                )}
              </button>
            </li>
          )}
        </EmoticonList>
      </Flex>
      <EmoticonList>
        {emoticonList &&
          emoticonList.map((el) => (
            <li key={el.uid}>
              <button
                type="button"
                className="btn_emo"
                onClick={() => onCopy(el)}
              >
                {el.emo}
              </button>
              <button
                type="button"
                className="btn_favor"
                onClick={() => onFavor(el)}
              >
                {el.favor ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </li>
          ))}
      </EmoticonList>
    </div>
  );
}
