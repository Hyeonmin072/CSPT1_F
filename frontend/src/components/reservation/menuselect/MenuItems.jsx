export default function MenuItems({ item, onClick }){
    const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : null;

    return (
        <li className="m-4 p-2 mb-5 mt-5 border-b w-full flex items-start" onClick={() => onClick(item)}>
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="h-20 mr-4" />}
            <div>
                <h4 className="font-bold p-1">{item.title}</h4>
                <p className="font-semibold text-gray-500 p-1">{item.description}</p>
                <p className="text-black-500 font-bold p-1">
                    {item.price}원 {item.originalPrice && (
                    <>
                        <span className="line-through text-gray-300">{item.originalPrice}원</span>
                        <span className="text-red-500 ml-2">({discount}% 할인)</span>
                    </>
                )}
                </p>
            </div>
        </li>
    );
}