export default function BlackListDetailModal({ setShowModal, selectedItem, setSelectedItem}){
    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };


    return(
        <div>
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[700px] min-h-[400px] p-6 rounded-lg shadow-lg w-[600px]">
                        <h2 className="text-xl font-bold mb-4">상세 정보</h2>
                        <div className="flex flex-col">
                            <div className="flex flex-row space-x-3">
                                <p className="font-bold">이름:</p>
                                <p>{selectedItem.u_name}</p></div>
                            <div className="flex flex-row space-x-7">
                                <p className="font-bold">ID:</p>
                                <p>{selectedItem.u_id}</p></div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="reason">
                                사유:
                            </label>
                            <textarea
                                id="reason"
                                className="w-full min-h-[200px] border rounded p-2 resize-none"
                                value={selectedItem.b_reason}
                                readOnly
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="mt-6 px-4 py-2 bg-green-600 text-white rounded "
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}