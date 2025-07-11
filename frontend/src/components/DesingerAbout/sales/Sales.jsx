import Graph from "./Graph.jsx";
import SaleStaus from "./SaleStaus.jsx";

// 그래프 차트
// npm install recharts
// npm install react-slick slick-carousel
export default function Sales() {

    return (
        <div className="container mx-auto max-w-7xl p-10 mt-20">
            <div className="flex flex-row gap-4">
                <SaleStaus />
            </div>
        </div>
    );
}
