import ShopAxios from "../../eventmenu/axios/EventAxios.jsx";

const ApiBlacklist = {
    // 블랙리스트 목록 조회
    fetchBlacklists: async (sId) => {
        try {
            const response = await ShopAxios.get("/blacklists");
            const blacklistData = response.data;

            // 현재 사업자 ID(sId)에 해당하는 블랙리스트만 필터링
            const filteredData = blacklistData.filter((entry) => entry.s_id === sId);

            // u_id를 기반으로 u_name을 조회해서 각 항목에 추가
            const updatedBlacklist = await Promise.all(
                filteredData.map(async (entry) => {
                    const u_name = await fetchgetUser(entry.u_id); // u_id로 u_name 조회
                    return { ...entry, u_name }; // u_name 추가
                })
            );

            return updatedBlacklist;
        } catch (error) {
            console.error("블랙리스트 조회 중 오류 발생:", error);
            throw error;
        }
    },

    // 블랙리스트 등록
    addBlacklist: async (newEntry) => {
        try {
            const response = await ShopAxios.post("/shop/blacklist", newEntry);
            console.log("등록 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("등록 실패:", error.response ? error.response.data : error.message);
            throw error;
        }

    },

    // 블랙리스트 삭제
    deleteBlacklist: async (entryIds) => {
        const response = await ShopAxios.post("/shop/blacklist/delete", {
            data: entryIds.map((id) => ({ b_id: id }))
        });
        return response.data;
    },
};

export default ApiBlacklist;
