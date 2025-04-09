import d1 from "../../assets/designer/d1.png";
import h1 from "../../assets/hairshop/h1.jpg";

export const dbDesigners = [
    {
        d_id: "001",
        d_name: "홍길동",
        d_back_image: h1, // 배경 이미지
        d_birth_date: "1990-05-15", // 생일
        d_email: "hong@example.com", // 이메일
        d_image: d1, // 프로필 이미지
        d_like: 120, // 좋아요 수
        d_nickname: "디자이너 홍", // 닉네임
        d_pwd: "password123", // 비밀번호
        d_tel: "010-1234-5678", // 전화번호
        s_id: "S001", // 소속 가게 ID
    },
    {
        d_id: "002",
        d_name: "김철수",
        d_back_image: h1,
        d_birth_date: "1985-09-22",
        d_email: "kim@example.com",
        d_image: d1,
        d_like: 98,
        d_gender: "남성",
        d_nickname: "철수쌤",
        d_pwd: "secure456",
        d_tel: "010-9876-5432",
        s_id: "S002",
        d_desc: "안녕하세요! 잘부탁드립니다!"
    },
    {
        d_id: "003",
        d_name: "이영희",
        d_back_image: h1,
        d_birth_date: "1992-07-11",
        d_email: "lee@example.com",
        d_image: d1,
        d_like: 76,
        d_nickname: "영희스타일",
        d_pwd: "password789",
        d_tel: "010-5678-1234",
        s_id: "S003",
    },
];

export const dbShops = [
    {
        s_id: "S001",
        s_name: "헤어샵 홍대점",
    },
    {
        s_id: "S002",
        s_name: "헤어살롱 강남점",
    },
    {
        s_id: "S003",
        s_name: "영희 스타일 압구정점",
    },
];


export const selectedDesigner = dbDesigners.find((designer) => designer.d_id === "002");
