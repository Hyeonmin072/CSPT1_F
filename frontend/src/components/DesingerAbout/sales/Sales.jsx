import Graph from "./Graph.jsx";
import SaleStaus from "./SaleStaus.jsx";

// 그래프 차트
// npm install recharts
// npm install react-slick slick-carousel
export default function Sales() {

    return (
        <div className="container mx-auto max-w-7xl p-10">
            {/* 윗줄 */}
            <div className="flex flex-row gap-4">
                <SaleStaus />
            </div>


            {/* 그래프 */}
            <div className="border bg-white rounded-lg p-6 ml-10 mr-10 shadow-md mt-4">
                <Graph />
            </div>


        </div>
    );
}
