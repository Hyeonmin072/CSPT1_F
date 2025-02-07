import { ChevronLeft } from 'lucide-react'

export default function ShopHeader(){
    const shopnames = [
        { name: "프랜차이즈 2호선아지랑점" }
    ];

    return (
        <div className="flex items-center space-x-2">
            <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => window.history.back()}
            >
                <ChevronLeft className="w-5 h-5"/>
            </button>

            {shopnames.map((shop, index) => (
                <span key={index} className="bg-teal-100 text-black px-5 py-2 rounded-lg text-sm font-semibold">
                        {shop.name}
                    </span>
            ))}
        </div>
    )
}