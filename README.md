![logo](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/6ef9a3e3-bd5a-4124-847d-c85609bb5d46)

**개요**

- 바코드 인식과 ISBN 검색을 통한 서지 정보 저장 웹 책장 서비스

**데모 링크**

<https://huchu.link/LgVUcpM>

**역할**

- 프론트엔드 80%, 백엔드 20%
- 약 2달 간 기획 및 개발
- `CloudType` 배포

**사용 스택**

- 프론트엔드 : TypeScript, React, styled-components, React Router, Zxing-js, Vite
- 백엔드 : Express, Passport, MongoDB, Mongoose

## 주요 기능

---

**목차**
1. [서지 정보 검색](#서지-정보-검색)
2. [REST API 통신](#rest-api-통신)
3. [PWA 적용](#pwa-적용)

### 서지 정보 검색

바코드 촬영 또는 직접 입력으로 서지 정보를 검색하는 기능입니다. 도서의 고유 번호인 ISBN을 통해 서지 정보를 가져오고 저장할 수 있습니다. 서지 정보는 **국립중앙도서관**의 Open API를 이용했습니다.

**구현 화면**
  
![카메라 검색](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/8a3f6757-21cb-4aa2-bcd1-82ac09c44ef3)

바코드 서지 정보 검색

![ISBN 검색](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/fe1c988c-ef84-4d1c-aa62-585923e77d36)

ISBN 서지 정보 검색

**설명**

- `Zxing-js`를 이용하여 도서의 바코드를 인식해 ISBN을 읽고 서지 정보를 가져옵니다.
- 바코드 인식이 동작하지 않을 경우 직접 입력으로 검색할 수 있습니다.
- DB에 저장된 ISBN을 먼저 찾고, 없다면 국립중앙도서관 api 데이터를 요청합니다.

**주요 이슈**

- 모바일에서 여러 개의 후면 카메라 중 저화질의 카메라가 먼저 선택되어 편의성 부족이 느껴졌습니다.
    - 고화질 카메라만 선택되도록 고정하여 검색 단계까지 클릭 횟수를 **50%** 감소했습니다. (4번 → 2번)

### REST API 통신

`Express`와 `MongoDB`를 이용해 서버를 구축하고 `REST API`방식으로 api를 구현해 통신했습니다. 

**요청 예시**

![`/bookcase/info`에 대한 **GET**](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/813ca355-c4eb-4a89-bcf3-36fd82d0926d)

`/bookcase/info`에 대한 **GET**

![`/bookcase/info`에 대한 **POST**](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/65981b5b-ab3d-45c8-aedb-a9997fef4b58)

`/bookcase/info`에 대한 **POST**

![`/bookcase/info`에 대한 **PATCH**](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/2478d465-dd73-478f-8362-b251a1cdacd0)

`/bookcase/info`에 대한 **PATCH**

![`/bookcase/info`에 대한 **DELETE**](https://github.com/Real-Bird/bookcase-in-the-phone/assets/83404864/468d2c52-fc35-499a-a101-2b04734d23fa)

`/bookcase/info`에 대한 **DELETE**

**설명**

- `/bookcase/info`에 대한 **GET** / **POST** / **PATCH** / **DELETE** 요청입니다.
- 명사형 `pathname`을 두고 method만 변경하여 CRUD를 진행했습니다.

**주요 이슈**

- api 요청 시 클라이언트에서 `CORS`이슈가 발생했습니다.
    - 서버에서는 `cors` 라이브러리를 추가해 `Allow` 헤더 옵션을 설정하고, 클라이언트에서는 `axios`의 `withCredentials`옵션을 설정해 해결했습니다.

### PWA 적용

모바일 웹을 대상으로 구현했지만, 매번 웹 브라우저를 켜야 하므로 접근성이 좋지 않았습니다. 이를 해결하고자 `네이티브`와 `PWA` 사이에서 고민했습니다. `네이티브`의 경우 러닝 커브가 높아 대안으로 `PWA`를 선택했습니다. [PWABuilder](https://www.pwabuilder.com/)을 이용하여 `manifest`를 만들어 적용했습니다.
