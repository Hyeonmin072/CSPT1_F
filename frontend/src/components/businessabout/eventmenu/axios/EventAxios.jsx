import axios from "axios";

// 기본 URL 설정 (백엔드 서버 주소)
const API_BASE_URL = "http://localhost:1271";

const ShopAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// GET 요청 예시
ShopAxios.fetchCouponsByBusinessId = async ({ s_id }) => {
    try {
        const response = await ShopAxios.get(`/shop/coupons`, {
            params: { s_id },
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("Error fetching coupons:", error);
        throw error; // 오류 발생 시 호출부에서 처리할 수 있도록 throw
    }
};

ShopAxios.fetchEventsByBusinessId = async ({ s_id }) => {
    try {
        const response = await ShopAxios.get(`/shop/events`, {
            params: { s_id },
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error; // 오류 발생 시 호출부에서 처리할 수 있도록 throw
    }
};

export default ShopAxios;
