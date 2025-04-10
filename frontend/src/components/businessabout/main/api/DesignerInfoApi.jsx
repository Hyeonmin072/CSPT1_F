import ShopAxios from "../../eventmenu/axios/EventAxios.jsx";

const ApiDesigner = {
    fetchDesigners: async () => {
        const response = await ShopAxios.get("/designers"); // API endpoint for fetching designers
        return response.data;
    },
};

export default ApiDesigner;