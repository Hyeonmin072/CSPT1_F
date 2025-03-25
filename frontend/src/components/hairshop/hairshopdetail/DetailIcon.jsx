import {
    MapPin,
    PhoneCall,
    Link,
    ArrowDownToLine,
    StarHalf,
    X
} from "lucide-react";

export default function DetailIcon(){
    return(
        <div className="p-5 flex gap-20 mb-5 items-center justify-center">
            <div>
                <StarHalf/>
                <p className="mt-5">평점</p>
            </div>
            <div>
                <MapPin/>
                <p className="mt-5">위치</p>
            </div>
            <div>
                <PhoneCall/>
                <p className="mt-5">전화</p>
            </div>
            <div>
                <Link/>
                <p className="mt-5">공유</p>
            </div>
        </div>
    );
}