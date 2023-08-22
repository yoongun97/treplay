import React from "react";

function SavedList({ savedPosts, allLikedData }) {
  return (
    <div>
      {savedPosts?.map((post) => {
        const likedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "like"
        );
        const dislikedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "dislike"
        );
        return (
          <div className="myListBox" key={post.id}>
            <div className="ImgBox">이미지</div>
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

export default SavedList;
