# Bookcase in the Phone

<details>
<summary>목차</summary>

- 0. [개요](#0-개요)
- 1. [스택](#1-스택)
  - 1-1. [Front-End](#1-1-front-end)
  - 1-2. [Back-End](#1-2-back-end)
- 2. [최종 구현 화면](#2-최종-구현-화면)
  - 2-1. [초기 화면 / 로그인 / 로그아웃](#2-1-초기-화면--로그인--로그아웃)
  - 2-2. [상세내용 / 수정 / 검색](#2-2-상세내용--수정--검색)
- 3. [주안점](#3-주안점)
  - 3-1. [바코드/ISBN 검색 기능](#3-1-바코드isbn-검색-기능)
  - 3-2. [서버 구현과 REST API](#3-2-1-서버-api-라우터)
  - 3-3. [PWA 적용](#3-3-pwa-적용)
  - 3-4. [(깨알주의) 아이콘과 로딩화면, 새로고침](#3-4-깨알주의-아이콘과-로딩화면-새로고침)
- 4. [한계점 및 개선 방안](#4-한계점-및-개선-방안)

</details>

## 0. 개요

**Bookcase in the Phone**은 **바코드** 및 **ISBN**으로 검색한 책의 서지 정보를 저장하는 웹 책장 서비스입니다. 소유한 도서를 쉽고 간편하게 웹에 저장하려는 목적으로 만들었습니다.

테마 컬러는 장미에서 영감을 얻었습니다.

## 1. 스택

### 1-1. Front-End

- `TypeScript` : 코드 상 오류를 미연에 방지하고 안전한 자바스크립트 문법을 사용할 수 있어 `TS`를 선호합니다.
- `React` : 가장 익숙하여 선택했습니다.
- `React Router` : 경로 설정이 쉽고 가장 익숙하여 선택했습니다.
- `@Zxing-js/Library` : 주요 기능인 바코드 스캔을 위한 라이브러리입니다. 자바스크립트 바코드 스캔 라이브러리 검색 결과 중 가장 유명한 라이브러리이고, 사용법을 빠르게 익혀 사용했습니다.
- `Styled Components` : 웹 스타일링을 위해 사용했습니다.
- `Axios` : 사용이 쉽고 직관성이 좋아 사용했습니다.

### 1-2. Back-End

- `Express` : 간단한 서버 구축을 위해 사용했습니다.
- `Passport` : 구글 로그인을 처리하기 위해 사용했습니다.
- `MongoDB` : 비교적 자유롭고 손쉬운 데이터 저장을 위해 사용했습니다.

## 2. 최종 구현 화면

### 2-1. 초기 화면 / 로그인 / 로그아웃

![최종구현1](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/f1ef676b-0d84-4cab-b3b8-7cbffda971c6)

### 2-2. 상세내용 / 수정 / 검색

![최종구현2](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/d8bac437-2c19-4d52-86fd-c89b4af8b62d)

## 3. 주안점

### 3-1. 바코드/ISBN 검색 기능

어플리케이션의 메인 기능으로, 스마트폰의 카메라를 이용하여 간단하게 바코드 스캔하여 서지 정보를 검색합니다. 바코드 인식이 제대로 되지 않을 시 손수 ISBN 적어 검색할 수 있습니다. 서지 정보는 **국립중앙도서관 OPEN API**의 **ISBN 서지정보 API**를 이용했습니다.

#### 3-1-1. 카메라 검색(/search/camera)

<details open="" class="details-reset border rounded-2">
  <summary class="px-3 py-2">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-device-camera-video">
    <path d="M16 3.75v8.5a.75.75 0 0 1-1.136.643L11 10.575v.675A1.75 1.75 0 0 1 9.25 13h-7.5A1.75 1.75 0 0 1 0 11.25v-6.5C0 3.784.784 3 1.75 3h7.5c.966 0 1.75.784 1.75 1.75v.675l3.864-2.318A.75.75 0 0 1 16 3.75Zm-6.5 1a.25.25 0 0 0-.25-.25h-7.5a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-6.5ZM11 8.825l3.5 2.1v-5.85l-3.5 2.1Z"></path>
</svg>
    <span class="m-1">카메라 검색(/search/camera)</span>
    <span class="dropdown-caret"></span>
  </summary>

  <video src="https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/6637470d-d80b-4d90-9bdc-529b8eaf363d" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">

  </video>
</details>

`Media Stream API`와 `@Zxing-js/Library`를 사용해 구현했습니다. 책의 바코드를 스캔하여 ISBN을 검색합니다. 검색된 서지 정보를 표시하며, 저장 혹은 재검색을 결정할 수 있습니다. 서지 정보가 없는 경우 바코드를 스캔하더라도 페이지 이동이 발생하지 않습니다.

초기에 여러 카메라를 선택할 수 있도록 구현했지만, 실질적으로 사용하고 바코드를 인식하는 카메라는 후면 뿐이어서 하나만 사용할 수 있게 수정했습니다.

#### 3-1-2. ISBN 검색(/search/isbn)

<details open="" class="details-reset border rounded-2">
  <summary class="px-3 py-2">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-device-camera-video">
    <path d="M16 3.75v8.5a.75.75 0 0 1-1.136.643L11 10.575v.675A1.75 1.75 0 0 1 9.25 13h-7.5A1.75 1.75 0 0 1 0 11.25v-6.5C0 3.784.784 3 1.75 3h7.5c.966 0 1.75.784 1.75 1.75v.675l3.864-2.318A.75.75 0 0 1 16 3.75Zm-6.5 1a.25.25 0 0 0-.25-.25h-7.5a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-6.5ZM11 8.825l3.5 2.1v-5.85l-3.5 2.1Z"></path>
</svg>
    <span class="m-1">ISBN 검색(/search/isbn)</span>
    <span class="dropdown-caret"></span>
  </summary>

  <video src="https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/7b822e4e-0c54-41b4-95b7-0f07c2e565d0" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">

  </video>
</details>

바코드 인식이 잘 되지 않거나 수동으로 검색하고 싶은 경우, 직접 ISBN을 입력하여 서지 정보를 검색할 수 있습니다. 마찬가지로, 서지 정보가 없으면 화면 이동이 발생하지 않습니다.

### 3-2. 서버 구현과 REST API

검색한 서지 정보를 DB에 저장하기 위해 간단한 서버를 직접 구현하였고, 클라이언트와 서버 간의 통신은 `REST API` 방식으로 설계했습니다.

#### 3-2-1. 서버 API 라우터

##### 3-2-1-1. auth

로그인 및 로그아웃 라우터입니다.

```js
"use strict";

const router = require("express").Router();
const authCtrl = require("../controller/auth");

router.get("/login/success", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/google", authCtrl.reqGoogle);
router.get("/google/callback", authCtrl.callbackGoogle);
router.get("/check", authCtrl.check);

exports.router = router;
```

`google` 로그인만 사용하여 `get` 메서드만 활용했습니다.

##### 3-2-1-2. bookcase

메인 서비스인 **Bookcase**와 관련한 API 라우터입니다.

```js
"use strict";

const router = require("express").Router();
const bookcaseCtrl = require("../controller/bookcase");

router.get("/list", bookcaseCtrl.bookList);
router.post("/info", bookcaseCtrl.savedBookInfo);
router.get("/info", bookcaseCtrl.getBookInfoByIsbn);
router.patch("/info", bookcaseCtrl.updateBookInfoByIsbn);
router.delete("/info", bookcaseCtrl.deleteBookByIsbn);
router.get("/check", bookcaseCtrl.checkBookByIsbn);

exports.router = router;
```

`pathname`로 요청을 구분할 수 있도록 작성했습니다. `/info`의 경우, 메서드에 따라 역할을 알 수 있습니다.

#### 3-2-2. 클라이언트 API 라우터

##### 3-2-2-1. auth

```ts
export async function googleLogin() {
  const data = await axios.get(`${SERVER_URL}/auth/login/success`, {
    withCredentials: true,
  }); // (...)
}

export async function logout() {
  await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
  // (...)
}

export async function checkedUser() {
  // (...)
  const { data } = await axios.get(`${SERVER_URL}/auth/check?token=${token}`, {
    withCredentials: true,
  });
  // (...)
}
```

##### 3-2-2-2. bookcase

```ts
// (...)

export async function savedBookInfo(bookInfo: FetchIsbnDataState) {
  const data = await axios.post(
    `${SERVER_URL}/bookcase/info?token=${token}`,
    bookInfo,
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
  return data;
}

export async function getBookInfoByIsbn(isbn: string) {
  const data = await axios.get<BookInfoResponse>(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/info?token=${token}&isbn=${isbn}`,
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
  return data;
}

export async function updateBookInfoByIsbn(isbn: string, body: UpdateInfoBody) {
  const data = await axios.patch<BookInfoResponse>(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/info?token=${token}&isbn=${isbn}`,
    { body },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
  return data;
}

export async function deleteBookInfoByIsbn(isbn: string) {
  const data = await axios.delete(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/info?token=${token}&isbn=${isbn}`,
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
  return data;
}

// (...)
```

서버의 API에 맞춰 메서드를 설정했습니다.

#### 3-2-3. CORS 해결

`Express`에 `cors` 라이브러리를 추가하고, `Allow` 헤더 옵션을 설정하여 해결했습니다.

```js
const corsOptions = {
  origin: process.env.ALLOW_ORIGIN,
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

### 3-3. PWA 적용

모바일 웹을 대상으로 구현했지만, 매번 웹 브라우저를 켜야 하므로 접근성이 좋지 않았습니다. 이를 해결하고자 `네이티브`와 `PWA` 사이에서 고민했습니다.

`네이티브`의 경우 추가로 학습해야 할 내용이 많아 대안으로 `PWA`를 선택했습니다. [PWABuilder](https://www.pwabuilder.com/)을 이용하여 `manifest`를 만들어 적용했습니다.

다만, 아이폰 환경은 테스트할 수 없어 고려하지 않았습니다.

### 3-4. (깨알주의) 아이콘과 로딩화면, 새로고침

![favicon](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/a44ad4eb-7b1a-4c67-b268-e7a0ba1bea7f)

책갈피가 꽂힌 책을 비롯한 여러 책이 진열된 폰 안의 책장을 표현한 아이콘입니다. 파워포인트로 만들었습니다.

<details open="" class="details-reset border rounded-2">
  <summary class="px-3 py-2">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-device-camera-video">
    <path d="M16 3.75v8.5a.75.75 0 0 1-1.136.643L11 10.575v.675A1.75 1.75 0 0 1 9.25 13h-7.5A1.75 1.75 0 0 1 0 11.25v-6.5C0 3.784.784 3 1.75 3h7.5c.966 0 1.75.784 1.75 1.75v.675l3.864-2.318A.75.75 0 0 1 16 3.75Zm-6.5 1a.25.25 0 0 0-.25-.25h-7.5a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-6.5ZM11 8.825l3.5 2.1v-5.85l-3.5 2.1Z"></path>
</svg>
    <span class="m-1">로딩화면과 새로고침</span>
    <span class="dropdown-caret"></span>
  </summary>

  <video src="https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/1bfb366f-b155-4de9-bf7c-9586b05b8155"  controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">

  </video>
</details>

스와이프를 통한 새로고침과 로딩화면입니다. `PWA`에서 새로고침하는데 사용하고자 스와이프 새로고침을 적용했고, 로딩화면은 아이콘을 `svg`로 만든 것을 사용했습니다.

## 4. 한계점 및 개선 방안

- **어색한 UI** : 디자인 감각을 키우기 위해 관련 서적을 읽으며 연습 중입니다. 또한, 다양한 브라우저 환경에 맞게끔 스타일링을 수정하겠습다. 데이터 로드나 검색 등의 로딩 UI도 추가하겠습니다.
- **헤더** : 정확하고 효율적으로 `http 통신`을 할 수 잇도록 다양한 헤더를 추가겠습니다. 인증도 쿼리가 아닌 `Authorization`을 사용하겠습니다.
- **데이터 로드** : 저장한 데이터가 많아지면 로드에 시간이 오래 걸릴 수 있으므로, 무한 스크롤 등으로 pagination을 구현하겠습니다.
