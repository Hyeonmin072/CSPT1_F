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

                <button>
                    <StarHalf/>
                    <p className="mt-5">평점</p>
                </button>
            </div>
            <div>
                <button>
                    <MapPin/>
                    <p className="mt-5">위치</p></button>
            </div>
            <div>

                <button>
                    <PhoneCall/>
                    <p className="mt-5">전화</p>
                </button>
            </div>
            <div>
                <button>
                    <Link/>
                    <p className="mt-5">공유</p>
                </button>
            </div>
        </div>
    );
}