import React from "react";

function MyList({ myPosts, allLikedData }) {
  return (
    <div>
      {myPosts?.map((post) => {
        const likedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "like"
        );
        const dislikedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "dislike"
        );
        const postImg = post.postImgs;
        console.log(postImg);
        return (
          <div className="ListBox" key={post.id}>
            {postImg ? (
              <img src={post.postImgs} alt="이미지" width="100px" />
            ) : (
              <img src="" alt="이미지 없음" width="100px"></img>
            )}
            <div className="ContentInfo">
              <span>{post.author}</span>
              <span>또가요({likedCount.length})</span>
              <span>안가요({dislikedCount.length})</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyList;
