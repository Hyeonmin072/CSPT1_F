export default function DesignerID({ designer }) {
    if (!designer) {
        return (
            <div className="fixed bottom-4 right-4 text-red-200 text-red-400 px-4 py-2 rounded-md text-sm z-50">
                ID를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 text-green-400 opacity-75 text-green-400 px-4 py-2 rounded-md text-sm z-50">
            ID: {designer.d_id}
        </div>
    );
}
