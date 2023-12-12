# (개인 프로젝트) Bookcase in the Phone (2023.01 ~ 2023.03)

![logo](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/6ef9a3e3-bd5a-4124-847d-c85609bb5d46)

**개요**

- 바코드 인식과 ISBN 검색을 통한 서지 정보 저장 웹 책장 서비스

**배포**

<https://rb-bip.netlify.app/>

**역할**

- 프론트엔드 80%, 백엔드 20%
- 약 2달 간 기획 및 개발
- `CloudType` 배포

**사용 스택**

- 프론트엔드 : TypeScript, React, styled-components, React Router, Zxing-js, Vite
- 백엔드 : Express, Passport, MongoDB, Mongoose

![](https://real-bird.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F162a7ddf-b2b3-4aa0-b8b5-d206e65dc616%2F6fb39442-5dc0-4f06-88e3-c9656a48a257%2Fbip-architecture.png?table=block&id=bd2b544d-4416-4d00-8d74-13bbd2ad7e35&spaceId=162a7ddf-b2b3-4aa0-b8b5-d206e65dc616&width=2000&userId=&cache=v2)

## 주요 기능

---

**목차**

1. [서지 정보 검색](#서지-정보-검색)
2. [토큰 방식 적용](#토큰-방식-적용)
3. [전역 상태 관리 코드 최적화](#전역-상태-관리-코드-최적화)
4. [빌드 파일 크기 최적화](#빌드-파일-크기-최적화)
5. [PWA 적용](#pwa-적용)

### 서지 정보 검색

**도서의 바코드 인식이나 ISBN 직접 입력으로 서지 정보 검색**

- `Zxing-js`를 이용하여 도서의 바코드를 인식해 ISBN을 읽습니다.
- 서지 정보는 국립중앙도서관의 오픈 API를 이용했습니다.

**바코드 검색**

![카메라 검색](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/8a3f6757-21cb-4aa2-bcd1-82ac09c44ef3)

**ISBN 검색**

![ISBN 검색](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/fe1c988c-ef84-4d1c-aa62-585923e77d36)

**후면 고화질 카메라 고정**

- 모바일에서 여러 개의 후면 카메라 중 저화질의 카메라가 먼저 선택되어 편의성 부족했습니다.
- 고화질 카메라를 고정하여 검색 단계까지 클릭 횟수를 **50%** 감소했습니다. (4번 → 2번)

**미디어 스트림 클린업**

- 카메라 검색 후 **미디어 스트림**이 확실하게 종료되지 않아 카메라 실행 표시가 지속해서 활성화되었습니다.
- `react-webcam` 패키지의 코드를 참고하여 미디어 스트림 종료 로직을 수정했습니다.
- [[React] Media Stream Cleanup 하기(feat. react-webcam)](https://velog.io/@real-bird/React-Media-Stream-Cleanup-하기feat.-react-webcam)

### 토큰 방식 적용

![토큰 방식 적용](https://real-bird.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F162a7ddf-b2b3-4aa0-b8b5-d206e65dc616%2Fe265e01b-2624-4924-aa89-2af2539b9bba%2Flogin-logic.png?table=block&id=a8cd5bda-744e-4794-9b55-0e9af0400f69&spaceId=162a7ddf-b2b3-4aa0-b8b5-d206e65dc616&width=2000&userId=&cache=v2)

**세션 방식 제거**

- 초기에 세션 방식으로 클라이언트를 식별했지만, 세션이 살아있는 동안 서버가 클라이언트의 상태를 가지고 있다고 판단했습니다.
- `REST`원칙 중 **무상태성(`stateless`)**에 위배된다고 판단해 세션 방식을 제거했습니다.

**토큰 방식으로 변경**

- 비암호화된 유저 정보 일부를 쿼리 파라미터로 보내 식별했습니다.
- 세션 제거와 보안 이슈 해결을 위해 `JWT`를 이용하여 로그인 로직을 수정했습니다.
- **[[BiP] 로그인 로직 변경 기록](https://velog.io/@real-bird/BiP-로그인-로직-변경-기록)**

### 전역 상태 관리 코드 최적화

**기존 상태 관리 방식 문제 개선**

- 기존 방식(**Context API**와 `**useReducer**`)에서 문제를 발견했습니다.
  - 상태 추적의 어려움
  - Context의 필요처마다 `Provider`로 감싸는 불편함
- 이를 개선하고자 `Zustand` 라이브러리로 대체했습니다.
- `Zustand`가 제공하는 `devtools` 미들웨어를 적용하여 상태 변경을 추적했습니다.
- Context와 `Provider`를 제거하여 전역 상태 관리 코드를 **약 40%** 줄였습니다. (285줄 → 176줄)
- **[[Zustand] 공식 문서만 보고 Zustand 적용해 보기](https://velog.io/@real-bird/Zustand-공식-문서만-보고-Zustand-적용해-보기)**

### 빌드 파일 크기 최적화

**빌드 후 index.js 용량 약 95% 감소**

- 빌드 후 모든 라이브러리가 `index.js`에 모이는 이슈가 발생했습니다.
- `vite`의 빌드 옵션 중 `rollupOptions.output`에 `manualChunks`를 추가하여 사용한 라이브러리를 `vendor`로 분리하였습니다.
- **600KB 이상**의 `index.js` 용량을 약 **30KB**로 줄였습니다.

### PWA 적용

모바일 웹을 대상으로 구현했지만, 매번 웹 브라우저를 켜야 하므로 접근성이 좋지 않았습니다. 이를 해결하고자 `네이티브`와 `PWA` 사이에서 고민했습니다. `네이티브`의 경우 러닝 커브가 높아 대안으로 `PWA`를 선택했습니다. [PWABuilder](https://www.pwabuilder.com/)을 이용하여 `manifest`를 만들어 적용했습니다.
