import React from "react";
import { styled } from "styled-components";

const Preview = () => {
  return (
    <PreviewContainer>
      <h2>구경해봐요 또갈집</h2>
      <CategoryButtonContainer>
        <CategoryButton>숙소</CategoryButton>
        <CategoryButton>맛집</CategoryButton>
        <CategoryButton>관광명소</CategoryButton>
      </CategoryButtonContainer>
      <PreviewListContainer>
        <PreviewListBox>
          <ImageBox>이미지</ImageBox>
          <LikesContainer>
            <div className="likesBox">
              <span>👍</span>
              <span>likes</span>
            </div>
            <div className="dislikesBox">
              <span>👍</span>
              <span>dislikes</span>
            </div>
          </LikesContainer>
        </PreviewListBox>
        <PreviewListBox>
          <ImageBox>이미지</ImageBox>
          <LikesContainer>
            <div className="likesBox">
              <span>👍</span>
              <span>likes</span>
            </div>
            <div className="dislikesBox">
              <span>👍</span>
              <span>dislikes</span>
            </div>
          </LikesContainer>
        </PreviewListBox>
        <PreviewListBox>
          <ImageBox>이미지</ImageBox>
          <LikesContainer>
            <div className="likesBox">
              <span>👍</span>
              <span>likes</span>
            </div>
            <div className="dislikesBox">
              <span>👍</span>
              <span>dislikes</span>
            </div>
          </LikesContainer>
        </PreviewListBox>
      </PreviewListContainer>
    </PreviewContainer>
  );
};

export default Preview;

const PreviewContainer = styled.div`
  margin: 140px auto;
  text-align: center;
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryButton = styled.div`
  width: 130px;
  height: 54px;
  margin: 60px 0 80px;
  background-color: #e4e8e9;
  color: #878d94;
  font-size: 24px;
  font-weight: 400;
  line-height: 54px;
  text-align: center;
  transition: 0.3s;

  &:first-child {
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
    border-right: 1px solid #d7d7d7;
  }

  &:last-child {
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
    border-left: 1px solid #d7d7d7;
  }

  &:hover {
    background-color: #d5dadc;
  }
`;

const PreviewListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;

const PreviewListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ImageBox = styled.div`
  width: 380px;
  height: 380px;
  margin-bottom: 20px;
  border-radius: 30px;
  background-color: #999;
`;

const LikesContainer = styled.div`
  display: flex;
  gap: 8px;
  & > div {
    display: flex;
    align-items: center;
    height: 38px;
    padding: 6px 10px;
    border-radius: 10px;
    border: 1px solid #222;
    font-size: 16px;
    font-weight: 300;
    line-height: 38px;
  }

  & > div > span:first-child {
    margin-right: 12px;
  }
`;
