import {useState, useEffect} from "react";

export default function SortOrder(){

    useEffect(() => {
        filtered.sort((a, b) => {
            if (sortOrder === "최신순") return a.postedTime - b.postedTime;
            if (sortOrder === "이름순") return a.title.localeCompare(b.title, "ko");
            return 0;
        });

    }, []);

    return(
        <>
            <select
                className="p-2 border rounded-lg w-[130px]"
                value={sortOrder}
                onChange={(e) => {
                    setSortOrder(e.target.value);
                }}
            >
                <option value="최신순">최신순</option>
                <option value="이름순">이름순</option>
            </select>
        </>
    );
}