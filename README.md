# React 프로젝트 : Treplay(Trip+Replay)

> **Create React App Project** <br/> **개발기간: 2023.08.07 ~ 2023.08.14**

## 프로젝트 소개
- 유저가 작성한 또 갈 집들에 대한 정보와 리뷰를 공유한다.
    - google api를 통해 지도 정보 제공
- 또간다/안간다 버튼 및 댓글을 통해 다양한 유저의 의견을 공유한다.

## 화면 구성

|          메인 페이지            |                리스트 페이지1                  |
| :-----------------------------: | :-------------------------------------------: |
| ![image](https://github.com/yoongun97/treplay/assets/108172921/e1f7d9d4-c637-4427-a8e7-650e49c51289) | ![image](https://github.com/yoongun97/treplay/assets/108172921/c38e2cfe-c2a2-4c7b-abdc-6c45a1ec083a)  |
|         리스트 페이지2          |                카테고리 페이지                  |
|![image](https://github.com/yoongun97/treplay/assets/108172921/bb76aa5b-84a5-4c1e-b481-241518178ec6)|   ![image](https://github.com/yoongun97/treplay/assets/108172921/2b4fedf9-611a-44de-b142-f0f61e15194f) |
|         포스트 정렬           |                 포스트 작성                    |
|![image](https://github.com/yoongun97/treplay/assets/108172921/8f0e11ba-e95f-4d07-8e2a-4bf4b2b361cb) |![image](https://github.com/yoongun97/treplay/assets/108172921/28508532-412e-4124-aa2a-7c2b002f134b)|
|       상세 페이지1            |                   상세 페이지2                |
|![image](https://github.com/yoongun97/treplay/assets/108172921/1ec9660e-48f9-4022-a20e-2e1ab8dd2173) | ![image](https://github.com/yoongun97/treplay/assets/108172921/0aac19e6-6d15-4521-a7e1-17e5c281f4c5) |
|       마이 페이지           |                   회원가입                |
|![image](https://github.com/yoongun97/treplay/assets/108172921/ed4d566b-4c5f-494e-bccf-19fe69fa0cfb) | ![image](https://github.com/yoongun97/treplay/assets/108172921/007f281c-bb4c-4982-863a-19c27a642436) |
|       로그인            |                   아이디/비밀번호 찾기                |
|![image](https://github.com/yoongun97/treplay/assets/108172921/46f7d612-33d1-4035-9bd3-44b292f00ad7) |![image](https://github.com/yoongun97/treplay/assets/108172921/d5fc0d0c-092e-4126-b72e-c7d5618262cd) |


---

## 주요 기능

### 회원정보 관리

#### 로그인, 회원가입

- 본인이 정한 이메일로 회원가입을 할 수 있습니다.
- google, facebook 계정으로 간편 로그인을 할 수 있습니다.

#### 아이디 찾기, 비밀번호 재설정

- 회원가입 시 입력한 정보를 통해 아이디를 찾을 수 있습니다.
- 회원가입 시 입력한 정보, 아이디를 통해 비밀번호 재설정을 할 수 있습니다.


### 리스트 페이지

#### 포스트 리스트 불러오기

- 카테고리 별 핫 플레이스를 통해 카테고리 별 포스트를 볼 수 있습니다.
- 구경해봐요 또 갈집을 통해 각 카테고리별 게시물을 미리 볼 수 있습니다.
- 베스트 또갈집을 통해 인기 게시물을 확인할 수 있습니다.


### 카테고리 페이지

#### 카테고리별 포스트 리스트 불러오기

- 카테고리별 모든 포스트를 볼 수 있습니다.
- 검색기능을 통해 원하는 포스트를 필터링해서 볼 수 있습니다.
- 정렬기능을 통해 최신순, 인기순으로 포스트를 나열할 수 있습니다.
  

### 상세 페이지

#### 포스트 상세정보 불러오기

- 사진, 장소명, 내용, 한줄평 등을 볼 수 있습니다.
- 지도를 통해 상세한 위치정보와 주소를 확인하고 복사할 수 있습니다.

#### 북마크, 공유

- 본인이 좋아하는 게시물을 북마크 버튼을 통해 마이페이지에 저장할 수 있고, 공유하기 버튼으로 해당 포스트 링크를 공유할 수 있습니다.

#### 추천, 비추천 버튼

- 또가요, 안가요 버튼을 통해 게시물에 본인의 의견을 표시할 수 있습니다.
- 게시물 별 또가요, 안가요 수와 비율을 보여주어 게시물의 신뢰도를 확인할 수 있습니다.

#### 댓글 작성

- 게시물 별로 댓글을 통해 본인의 의견을 제시할 수 있습니다.


### 마이 페이지

#### 작성한 글 목록 불러오기

- 본인이 작성한 글 목록을 볼 수 있습니다.
- 본인이 작성한 글을 삭제할 수 있습니다.

#### 북마크한 글 목록 불러오기

- 상세페이지에서 북마크 버튼를 눌렀던 포스트 목록을 불러올 수 있습니다.
- 카드를 눌러 해당 게시물의 상세페이지로 이동할 수 있습니다.




## API 명세서

기능 | URL | Method | request | response
-----|------|------|-------|------
로그인 |/api/login | POST | {<br> email: string,  <br> password: string,  <br>  } | { <br> uid, <br> email,  <br> }
회원가입 |/api/signup | POST | {<br> id: string,  <br> email: string,  <br> password: string,  <br> } | -
마이페이지(작성  목록) | /api/mypage/:uid | GET | {<br> uid:string <br> },| posts: { <br> postId, <br> postTitle, <br> postContent, <br>}
마이페이지(추천 목록) | /api/mypage/:uid | GET | likes :{ <br> userId: string, <br> state:string, <br> postId:string, <br> } <br> posts: { <br> postId <br> } <br> | posts: { <br> postId, <br> postTitle, <br> postContent, <br> } 
리스트 조회 | /api/posts | GET | posts: { <br>selectedUpperOption <br> } | posts: {<br>postTitle,<br>postImg,<br>author<br>}
카테고라이징 | /api/items, <br> /api/tips | GET |posts:{<br>selectedLowerOption<br>} | posts: {<br>postTitle,<br>postImg,<br>author<br>}
포스트 조회 | /api/detail/:postId | GET | posts: {<br>postId:string,<br>} | posts: <br>postTitle,<br>postImg,<br>postContent<br>}
포스트 추가 | /api/posts | POST |posts:{<br>postTitle:string,<br>postImg:string,<br>postContent: string,<br>author:user.email,<br>uid:user.id,<br>selectedUpperOption: string,<br>selectedLowerOption:string,<br>id:string<br>}|-
포스트 삭제 | /api/posts/:postId | DELETE | posts:{<br>postId:string, <br>uid:string<br>} | -
포스트 수정 | /api/posts/:postId | PATCH |posts:{<br>postTitle:string,<br>postImg:string,<br>postContent: string,<br>uid:user.id,<br>selectedUpperOption: string,<br>selectedLowerOption:string,<br>id:string<br>} | posts: { <br> postTitle,<br>postImg<br>postContent<br>selectedUpperOption,<br>selectedLowerOption<br>
추천 조회 | /api/likes | GET | likes: {<br>postId:string,<br>uid:string,<br>state:string<br>} | likes:{<br>uid<br>}
추천 추가 | /api/likes | POST | likes: {<br>postId:string,<br>uid:string,<br>state:string<br>} | -
추천 삭제 | /api/likes | DELETE | likes: {<br>postId:string,<br>uid:string,<br>state:string<br>} | -
댓글 추가 | /api/comments | POST |  { <br> author:user.email,<br>uid:user.id<br>id:string,<br>postId,<br>content:string,<br>} | comments: {<br>author,<br>content,<br>}
댓글 삭제 | /api/comments | DELETE| comments:{<br>uid:user.id<br>id,<br>} | -


