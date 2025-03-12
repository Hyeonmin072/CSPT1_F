export default function SortOrder({ sortOrder, setSortOrder }){
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