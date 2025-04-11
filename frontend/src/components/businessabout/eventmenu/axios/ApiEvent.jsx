import EventAxios from "./EventAxios.jsx";

const ApiEvent = {
    // 이벤트 가져오기
    fetchEvents: async () => {
        const response = await EventAxios.get("/shop/events");
        return response.data;
    },

    // 이벤트 등록
    createEvents: async (newEvent) => {
        const response = await EventAxios.post("/shop/event", newEvent);
        return response.data;
    },

    // 쿠폰 가져오기
    fetchCoupons: async () => {
        const response = await EventAxios.get("/shop/coupons");
        return response.data;
    },

    // 쿠폰 등록
    createCoupons: async (newCoupon) => {
        const response = await EventAxios.post("/shop/coupon", newCoupon);
        return response.data;
    },

};

export default ApiEvent;