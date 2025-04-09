
import api from "../../api/axiosInstance";

export const updateUserLocation = async (lat, lng, address) => {
    try{
        const response = await api.post("/user/location/update",{
            lat,  // y 축 
            lng,  // x 축
            address,
        });
        return response.data;
    }catch (error){
        console.error("위치 업데이트 실패:",error);
        throw error;
    }
};

export const  getUserLocation = async () => {
    try{
        const response = await api.get("/user/location");
        return response.data;
    } catch (error){
        console.error("유저 위치 불러오기 실패!",error);
        throw error;
    }
};