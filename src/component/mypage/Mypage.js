import React, { useEffect, useState } from "react";
import { off, onValue, ref, runTransaction } from "firebase/database";
import { setUser } from "@redux/actions/user_action";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { dbData, tagList } from "../db";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { EmoticonList } from "@component/CommonStyled";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { TagListBox } from "../CommonStyled";
import GoogleAd from "../GoogleAd";

export default function Mypage() {
  const toast = useToast();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const [myEmoticon, setMyEmoticon] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("");
  const typeSort = (type) => {
    setType(type);
  };

  useEffect(() => {
    let arr = [];
    setIsLoading(true);
    if (userInfo?.favor) {
      arr = dbData.filter((el) => {
        return userInfo.favor.includes(el.uid);
      });
      if (type) {
        arr = arr.filter((el) => el.tag === type);
      }
      setMyEmoticon(arr);
    } else {
      setMyEmoticon("");
    }
    setIsLoading(false);
  }, [userInfo, userInfo?.favor, type]);

  const unFavor = (el) => {
    const fRef = ref(db, `user/${userInfo.uid}/favor`);
    let newFavor;
    runTransaction(fRef, (pre) => {
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
      }
      let newUser = { ...userInfo };
      newUser.favor = newFavor;
      dispatch(setUser(newUser));
      return newFavor;
    });
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
      <EmoticonList>
        {myEmoticon &&
          myEmoticon.map((el) => (
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
                onClick={() => unFavor(el)}
              >
                <MdFavorite />
              </button>
            </li>
          ))}
        {!myEmoticon && (
          <span style={{ color: "#999" }}>즐겨찾는 이모티콘이 없습니다.</span>
        )}
      </EmoticonList>
    </div>
  );
}
