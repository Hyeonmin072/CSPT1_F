import axiosInstance from "../../axios/AxiosInstance";

export const fetchDesignerPageData = async() => {
    const response = await axiosInstance.get("/user/designerpage");
    return response.data;
}

export const fetchDesignerReviewImages = async(designerEmail) => {
    const response = await axiosInstance.get(`/user/${designerEmail}/review-images`);
    return response.data;
}

