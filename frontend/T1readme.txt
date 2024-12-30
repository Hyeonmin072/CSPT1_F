※ T1 개발인원 필독

Hairtalk Project의 FE는 Vite를 사용해서 React Project를 생성했습니다.
해당 프로젝트의 실행은 ../T1/hairtalk 디렉토리에서
npm run dev 를 사용해서 시작해주세요
또한 컴포넌트 개발 시 확장자명은 .jsx로 부탁드립니다.

만약 실행에 문제가 있을 경우 하기 명령어를 이용하여 관련 라이브러리를 설치해주세요

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

features :  기능 담당 저장소
    auth : 인증 기능 담당
    product : 상품 담당

layout :  레이아웃 컴포넌트

constans : 상수 저장소

hooks : 커스텀 Hook 저장소

pages : 페이지 컴포넌트 저장소

services : axios 등 통신 관련 기능 저장소

store : 상태 , 전역 상태 등 상태 관리 기능