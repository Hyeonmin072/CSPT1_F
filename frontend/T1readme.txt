※ T1 개발인원 필독

Hairtalk Project의 FE는 Vite를 사용해서 React Project를 생성했습니다.
해당 프로젝트의 실행은 ../T1/hairtalk 디렉토리에서
npm run dev 를 사용해서 시작해주세요
또한 컴포넌트 개발 시 확장자명은 .jsx로 부탁드립니다.

만약 실행에 문제가 있을 경우 하기 명령어를 이용하여 관련 라이브러리를 설치해주세요

리액트 17버전 부터는 JSX 변환이 자동으로 변경되어
import React from "react";
상기 import문이 필요없습니다.


■■■■■■■■■■■■■■■■■■■■■■■■■■■ 라이브러리 ■■■■■■■■■■■■■■■■■■■■■■■■■■■
실행 :
    npm run dev
    -> 안될 경우 npm install


라우팅 관련:
    npm install react-router-dom

상태관리 관련:
    서버 관련:
        npm install @tanstack/react-query
    클라이언트 관련:
        npm install recoil

컴포넌트 스타일링 및 UI 관련:
    npm install lucide-react
    npm install tailwindcss
    npm install @emotion/styled
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

API 통신 관련:
    npm install axios


예정 :
SWIPER



프론트엔드 컴포넌트 폴더 별 기능

common : 공통으로 사용하는 컴포넌트

features :  기능 담당
    auth : 인증 기능

layout :  레이아웃 컴포넌트

constans : 상수 저장소
ㄴconstans 내에는 route.jsx 생성 예정
라우팅 경로 지정은 route.jsx에서 진행하고 app.jsx에서 import 받아 가독성 높게 사용하기

route 이외로 뭐 다른 상수 데이터를 저장할 경우 해당 디렉토리에서 진행

hooks : 커스텀 Hook 저장소
ㄴ 모르겠으면 만지지마쇼


pages : 페이지 저장소
ㄴpages 내에서 각 페이지 별로 디렉토리 분리하여 사용
Ex : pages/main/components
예시에서의 경로에서는 main 페이지 에서"만" 사용하는 컴포넌트를
pages/main/components 경로에 생성
이외 다른 페이지에서도 공통적으로 사용하는 컴포넌트는 common/components로 이동하여 생성하고 Export/Import 하여 사용

services : axios 등 통신 관련 기능 저장소

store : 상태 , 전역 상태 등 상태 관리 기능


디렉토리 확실하게 구분하여 컴포넌트 생성하고 저장하기 제발 막 만들지 말고 구분해서 만들기.

어려우면 막 만든 다음 짤라서 구분이라도 하세요 << 이게 좀 더 편하긴 할듯 ? 제대로 구분 시켜놓을 수만 있으면

프로젝트에서 메인으로 사용하는 TailWindCSS 베이스 컬러는 아래에 해당합니다
- Purple
- Fuchsia
- Pink
- Rose
- Indigo
- White
팀 컬러 맞춰서 사용해 주세요

컬러나 디자인 포함해서 막 만들어오면 걍 안씁니다

그리고 그런 상황이 반복되면 그냥 프로젝트 제외하겠습니다 그렇게 합 안맞추실거면 걍 혼자하십쇼