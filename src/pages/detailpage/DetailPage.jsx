import React from "react";
import PlaceMap from "../../components/PlaceMap";

function DetailPage() {
  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto 0 auto",
        }}
      >
        <h2>장소명</h2>
        <button style={{ margin: " 20px 5% 20px auto" }}>공유하기</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto 0 auto",
          }}
        >
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <img
            style={{
              width: "400px",
              height: "400px",
            }}
            src="https://cdn.pixabay.com/photo/2023/08/02/14/25/dog-8165447_640.jpg"
            alt="디테일 이미지"
          />
          <p>내용</p>
          <PlaceMap />
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <button>또가요</button>
            <button>안가요</button>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{ width: "50%", height: "20px", backgroundColor: "Red" }}
            >
              50%
            </div>
            <div
              style={{ width: "50%", height: "20px", backgroundColor: "Blue" }}
            >
              50%
            </div>
          </div>
        </div>
        <div
          style={{ width: "800px", height: "300px", border: "1px solid black" }}
        >
          댓글 창
        </div>
      </div>
    </>
  );
}

export default DetailPage;
