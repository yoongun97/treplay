import React, { useEffect, useContext, useCallback } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as s from "./StyledCreate";
// import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

// export function useBlocker(blocker, when = true) {
//   const { navigator } = useContext(NavigationContext);

//   useEffect(() => {
//     if (!when) return;

//     const unblock = navigator.block((tx) => {
//       const autoUnblockingTx = {
//         ...tx,
//         retry() {
//           unblock();
//           tx.retry();
//         },
//       };
//       blocker(autoUnblockingTx);
//     });
//     return unblock;
//   }, [navigator, blocker, when]);
// }

// export function usePrompt(message, when = true) {
//   const blocker = useCallback(
//     (tx) => {
//       //   eslint-disable-next-line no-alert
//       if (window.confirm(message)) tx.retry();
//     },
//     [message]
//   );

//   useBlocker(blocker, when);
// }

// import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

// export function useBlocker(blocker, when = true) {
//   const { navigator } = useContext(NavigationContext);

//   useEffect(() => {
//     if (!when) return;

//     const unblock = navigator.block((tx) => {
//       const autoUnblockingTx = {
//         ...tx,
//         retry() {
//           unblock();
//           tx.retry();
//         },
//       };
//       blocker(autoUnblockingTx);
//     });
//     return unblock;
//   }, [navigator, blocker, when]);
// }

// export function usePrompt(message, when = true) {
//   const blocker = useCallback(
//     (tx) => {
//       //   eslint-disable-next-line no-alert
//       if (window.confirm(message)) tx.retry();
//     },
//     [message]
//   );

//   useBlocker(blocker, when);
// }

function Create() {
  const [post, setPost] = useAtom(postAtom);
  // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  useEffect(() => {
    // console.log("mount");
    return () => {
      // console.log("cleanup");
      window.scrollTo(0, 0);
    };
  }, [post]);

  // usePrompt("현재 페이지를 벗어나시겠습니까?", true);

  return (
    <s.CreateContainer>
      <s.SelectBoxContainer>
        <SelectBox />
      </s.SelectBoxContainer>
      {/* <PlaceAddress /> */}
      <PlaceSearch />
      <div className="TextContainer">
        <s.StyledTextarea
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></s.StyledTextarea>
        <s.StyledInput
          type="text"
          placeholder="10자 이내의 한줄평을 남겨 주세요"
          maxLength="10"
          onChange={(e) => {
            setPost({ ...post, postOneLineContent: e.target.value });
          }}
        />
      </div>
      <ImageUpload />
    </s.CreateContainer>
  );
}

export default Create;
