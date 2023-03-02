# Bookcase in the Phone

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

- [ ]  **구현 요구 사항 목록**
    - 체크 리스트 형태로 추가
- [ ]  **사용한 프레임워크 및 라이브러리 설명**
    - package.json 참조하여 선택한 이유 작성
- [ ]  **폴더 구조 설명**
    - 폴더를 구분한 기준에 대하여 설명
    - tree 명령어를 사용하면 간편하게 디렉토리 구조를 출력할 수 있음
- [ ]  **과제 진행 시 주안점 작성**
    - 고민한 부분에 대하여 서술
- [ ]  **한계점 및 개선 사항 작성**
    - 고려는 하였으나 실제 구현하지 못한 부분에 대하여 서술

