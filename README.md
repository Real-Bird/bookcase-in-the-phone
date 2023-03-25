# [Bookcase in the Phone](https://web-bookcase-in-the-phone-luj2cldumsahu.sel3.cloudtype.app/)

## 개요

**Bookcase in the Phone**은 **바코드** 및 **ISBN**으로 검색한 책의 서지 정보를 저장하는 웹 책장 서비스입니다. 소유한 도서를 쉽고 간편하게 웹에 저장하려는 목적으로 만들었습니다.

### 주요 스택
- **Front-End** : [ ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white), ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white), ![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=flat&logo=StyledComponents&logoColor=white), ![Zxing Library](https://img.shields.io/badge/Zxing-Library-ffffff?style=flat&logoColor=white) ]
- **Back-End** : [ ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white), ![Passport](https://img.shields.io/badge/Passport-34E27A?style=flat&logo=passport&logoColor=white), ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) ]

## 최종 구현 화면 이미지 및 동영상

### 초기 화면 및 로그인(/login)

![초기 화면](https://user-images.githubusercontent.com/83404864/222443765-9ccc3f68-80c8-4ded-a1d9-1406143a049a.png)

- 초기 화면은 저장한 책 목록입니다. 리스트 형과 그리드 형으로 볼 수 있게 구성했습니다. 

[landing-login.webm](https://user-images.githubusercontent.com/83404864/219308208-f8c6d4e7-bbc2-4831-b2e6-252013dc7c05.webm)

- `passport`의 `google oauth20` 전략을 사용하여 로그인을 구현했습니다. 로그인 실패 시 `/login`에 머물며, 성공 시 `/`으로 이동합니다.
- 검증 라우트를 추가하여 로그인이 되어 있지 않으면 다른 페이지로 이동하지 못하도록 방지했습니다.

### 검색 화면 (/saerch)

- `검색` 기능은 카메라로 바코드를 읽거 검색하는 `camera search`와 ISBN으로 검색하는 `isbn search` 두 가지로 구분했습니다. `/search` 경로 아래에 중첩 라우트로 구성했습니다.
- 유효한 ISBN일 경우 **국립중앙도서관 Open API**의 **ISBN 서지 정보** 데이터를 호출합니다. 이미 DB에 존재하는 책이라면 해당 책의 상세 페이지로 이동합니다.

#### 카메라 검색(/search/camera)

[camera search.webm](https://user-images.githubusercontent.com/83404864/222394680-3f784e20-6a56-4b0a-a419-265f415d3441.webm)

- 책의 바코드를 스캔하여 ISBN을 검색합니다. 검색된 서지 정보를 표시하며, 저장 혹은 재검색을 결정할 수 있습니다.

#### ISBN 검색(/search/isbn)

[isbn search.webm](https://user-images.githubusercontent.com/83404864/222421345-c2fbb33e-79cf-4437-a5dd-29f19118afd7.webm)

- 직접 ISBN을 입력하여 서지 정보를 검색합니다.

### 상세 화면(/books/:isbn, /books/:isbn/edit)

![상세 화면](https://user-images.githubusercontent.com/83404864/222444360-b3cad6a6-de1e-43f1-8aee-03ed58f3d4fc.png)

- 저장한 책의 상세 화면과 수정 화면입니다. 서지 정보 외의 독서 날짜와 간단한 감상평을 기록할 수 있도록 구현했습니다.

## 사용한 프레임워크 및 라이브러리

### Front-End
- `React Router` : 경로 설정이 쉽고 가장 익숙하여 선택했습니다.
- `Zxing-js/library` : 주요 기능인 바코드 스캔을 위한 라이브러리입니다. 자바스크립트 바코드 스캔 라이브러리 검색 결과 중 가장 먼저 발견했고, 사용법을 빠르게 익혀 사용했습니다.
- `Styled Components` : 웹 스타일링을 위해 사용했습니다.
- `Axios` : 서버와 통신하기 위해 사용했습니다.

### Back-End
- `Express` : 간단한 서버 구축을 위해 사용했습니다.
- `Passport` : 구글 로그인을 처리하기 위해 사용했습니다.
- `MongoDB` : 비교적 자유롭고 손쉬운 데이터 저장을 위해 사용했습니다.

## 폴더 구조

### Front-End
```
\---front-end
    |   .env
    |   .eslintrc.cjs
    |   index.html
    |   package-lock.json
    |   package.json
    |   tsconfig.json
    |   tsconfig.node.json
    |   vite.config.ts
    |                 
    +---public
    |       barcode.png
    |       favicon.png
    |       favicon.svg
    |       no_image_available.png
    |       vite.svg
    |       
    \---src
        |   main.tsx
        |   Root.tsx
        |   Router.tsx
        |   vite-env.d.ts
        |   
        +---api
        |       auth.ts
        |       bookcase.ts
        |       
        +---components
        |   +---auth
        |   |       Google.tsx
        |   |       index.tsx
        |   |       Logout.tsx
        |   |       
        |   +---bookcase
        |   |       BookListItem.tsx
        |   |       BookSubInfo.tsx
        |   |       index.tsx
        |   |       SearchItem.tsx
        |   |       ToggleGridButton.tsx
        |   |       
        |   +---common
        |   |       Button.tsx
        |   |       ErrorBoundary.tsx
        |   |       FloatingInput.tsx
        |   |       index.tsx
        |   |       InitLoading.tsx
        |   |       Input.tsx
        |   |       Layout.tsx
        |   |       LogoSvg.tsx
        |   |       Navigation.tsx
        |   |       PageLoading.tsx
        |   |       ReadingDate.tsx
        |   |       
        |   +---search
        |   |       Camera.tsx
        |   |       index.tsx
        |   |       Select.tsx
        |   |       
        |   \---searchResult
        |           BookInfoItem.tsx
        |           index.tsx
        |           ResultDetail.tsx
        |           
        +---containers
        |   +---about
        |   |       index.tsx
        |   |       
        |   +---auth
        |   |       index.tsx
        |   |       
        |   +---bookcase
        |   |       index.tsx
        |   |       
        |   +---bookDetail
        |   |       edit.tsx
        |   |       index.tsx
        |   |       
        |   +---search
        |   |       CameraSearch.tsx
        |   |       index.tsx
        |   |       IsbnSearch.tsx
        |   |       
        |   \---searchResult
        |           index.tsx
        |           
        +---libs
        |       bookcaseContextApi.tsx
        |       searchContextApi.tsx
        |       userContextApi.tsx
        |       useScanner.ts
        |       useWindowSize.ts
        |       utils.ts
        |       
        +---pages
        |       About.tsx
        |       Bookcase.tsx
        |       BookDetail.tsx
        |       BookDetailEdit.tsx
        |       Login.tsx
        |       NotFound.tsx
        |       Search.tsx
        |       SearchResult.tsx
        |       
        \---styles
                global.css
```
- 각 역할에 맞춰 디렉토리를 구분했습니다. 화면에 노출되는 부분은 `pages`, 기능이 동작하는 부분은 `containers`, 단순한 컴포넌트는 `components`로 나눴습니다. 서버와 통신하는 함수는 `api`에, 클라이언트에서 동작하는 커스텀 훅이나 함수는 `libs`에, 공통적인 스타일링은 `styles`로 구분했습니다.

### Back-End

```
+---back-end
|   |   .env
|   |   app.ts
|   |   index.ts
|   |   package-lock.json
|   |   package.json
|   |   tsconfig.json
|   |   
|   +---build
|   |   |   app.js
|   |   |   index.js
|   |   |   
|   |   \---src
|   |       +---controller
|   |       |       auth.js
|   |       |       bookcase.js
|   |       |       
|   |       +---db
|   |       |       book.js
|   |       |       index.js
|   |       |       user.js
|   |       |       
|   |       +---libs
|   |       |       passport.js
|   |       |       
|   |       \---routes
|   |               auth.js
|   |               bookcase.js
|   |                 
|   \---src
|       +---controller
|       |       auth.ts
|       |       bookcase.ts
|       |       
|       +---db
|       |       book.ts
|       |       index.ts
|       |       user.ts
|       |       
|       +---libs
|       |       passport.ts
|       |       
|       \---routes
|               auth.ts
|               bookcase.ts
```

- 마찬가지로 역할에 따라 디렉토리를 구분했습니다.
- `TypeScript`로 작성했으나 빌드가 원할하지 않아 `JavaScript`로 재작성하여 두 개의 폴더가 되었습니다. 구동하는 서버 코드는 위의 `/build` 폴더의 `JS` 코드입니다.

## 주안점

- 스마트폰의 카메라를 이용하여 간단하게 바코드 스캔하는 것에 집중했습니다. 바코드 인식이 제대로 되지 않을 시 손수 검색 가능하도록 ISBN 검색 기능도 병행했습니다.
- 간단한 어플리케이션이며 초보적인 백엔드 지식을 필요로 하여 클라이언트와 서버 모두 직접 구현했습니다.
- 서버와 통신하는 API는 REST API로 구현했습니다.

## 한계점 및 개선 사항

- 네이티브 앱이 아닌 만큼 카메라 접근·변환이 수월하지 않은 점과 `Android`와 `IOS`의 다른 미디어 접근 방식으로 인해 원할하지 않았던 점이 아쉬웠습니다. 추후 가장 우선으로 개선할 예정입니다.
