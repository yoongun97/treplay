import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, useParams } from "react-router-dom";

const Preview = ({
  posts,
  selectedCategory,
  setSelectedCategory,
  allLikedData,
}) => {
  const { nation } = useParams();
  const [selectedPosts, setSelectedPosts] = useState([]);

  // 처음 컴포넌트 렌더링 될 때 숙박으로 카테고리 맞추고 리스트 불러오는 과정
  const fetchData = async () => {
    const filteredPosts = await posts.filter(
      (post) => post.nation === nation && post.category === "숙박"
    );
    setSelectedPosts(filteredPosts);
  };

  useEffect(() => {
    fetchData();
    console.log("랜더링!");
  }, [posts]);

  // 버튼을 누르면 해당 nation, category 로 필터하여 데이터 가져옴
  const selectListHandler = async (category) => {
    const filteredPosts = await posts.filter(
      (post) => post.nation === nation && post.category === category
    );
    setSelectedPosts(filteredPosts);
  };
  return (
    <PreviewContainer>
      <h2>구경해봐요 또갈집</h2>
      <CategoryButtonContainer>
        <CategoryButton
          onClick={() => {
            selectListHandler("숙박");
            setSelectedCategory("숙박");
          }}
          selected={selectedCategory === "숙박"}
        >
          숙박
        </CategoryButton>
        <CategoryButton
          onClick={() => {
            selectListHandler("맛집");
            setSelectedCategory("맛집");
          }}
          selected={selectedCategory === "맛집"}
        >
          맛집
        </CategoryButton>
        <CategoryButton
          onClick={() => {
            selectListHandler("관광명소");
            setSelectedCategory("관광명소");
          }}
          selected={selectedCategory === "관광명소"}
        >
          관광명소
        </CategoryButton>
      </CategoryButtonContainer>
      <PreviewListContainer>
        {/* 걸러진 데이터 중 3번째까지만 보여줌 */}
        {selectedPosts.map((post, index) => {
          if (index <= 2) {
            // 이미지 중 1번째만 잡아서 백그라운드로 넣어줌
            const imageUrl = post.postImgs[0];
            const imageStyle = {
              backgroundImage: `url(${imageUrl})`,
            };
            const likedCount = allLikedData?.filter(
              (data) => data.postId === post.id && data.state === "like"
            );
            const dislikedCount = allLikedData?.filter(
              (data) => data.postId === post.id && data.state === "dislike"
            );
            return (
              <PreviewListBox to={`/detail/${post.id}`} key={post.id}>
                <ImageBox style={imageStyle}></ImageBox>
                <h3>{post.placeName}</h3>
                {/* 추천/비추천 개수 보여줌 */}
                <LikesContainer>
                  <div className="likesBox">
                    <img src="icon/like_icon.svg" alt="likesIcon"></img>
                    <span>{likedCount.length}</span>
                  </div>
                  <div className="dislikesBox">
                    <img src="icon/dislike_icon.svg" alt="dislikesIcon"></img>
                    <span>{dislikedCount.length}</span>
                  </div>
                </LikesContainer>
              </PreviewListBox>
            );
          }
          return null;
        })}
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

  /* selected가 현재 선택한 카테고리를 뜻함. 이게 true이면 파랗게 만듦 */
  background-color: ${(props) => (props.selected ? "#0A58BE" : "#e4e8e9")};
  color: ${(props) => (props.selected ? "#fff" : "#878d94")};
  font-size: 24px;
  font-weight: 400;
  line-height: 54px;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;

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

  /* 현재 선택된 버튼은 hover 되지 않도록 함 */
  &:hover {
    background-color: ${(props) => (props.selected ? "#0A58BE" : "#d5dadc")};
  }
`;

const PreviewListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;

const PreviewListBox = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ImageBox = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 30px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const LikesContainer = styled.div`
  display: flex;
  gap: 8px;

  margin-top: 20px;
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

  & > div > img {
    margin-right: 12px;
  }
`;
