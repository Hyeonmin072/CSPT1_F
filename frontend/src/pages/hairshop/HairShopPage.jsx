import React, {useEffect, useRef, useState} from 'react';
import ShopPage from "../../components/hairshop/HairShop.jsx";

export default function HairShopPage () {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    {/* 애니메이션 효과 */}
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.dataset.index]: true,
                        }));
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".hairshop-item");
            items.forEach((item, index) => {
                item.dataset.index = index;
                observer.observe(item);
            });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="p-4" >
            <ShopPage containerRef={containerRef}/>
        </div>
    );
};
