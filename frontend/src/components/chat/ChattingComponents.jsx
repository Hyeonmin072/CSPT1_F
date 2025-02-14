import { useState , useRef, useEffect } from "react";
export default function ChattingComponents({nickname, chatting, time, isMe}: any) {
    //chatNick 상태 변수와 setChatNick 함수 정의
    const [chatNick, setChatNick] = useState("");

    //isMe와 nickname에 따라 chatNick을 설정
    useEffect(() => {
        setChatNick(isMe ? "나" : nickname);
    }, [isMe, nickname]);
    return (
        <div>
            {/*  채팅 입력한 사람이 나(본인)인 경우 : 채팅 입력한 사람이 타인인 경우  */}
            {isMe ? (
                <div id="me" className={"flex justify-end my-5"}>
                    <div id="time" className={"flex flex-col justify-end mr-3"}>
                        <p className="text-xs text-black">{time}</p>
                    </div>
                    <div className={"mr-3"}>
                        <div id="nickname" className={"flex justify-end"}>
                            <p className={"text-xs text-white"}>{chatNick}</p>
                        </div>
                        <div id="chatting" className={"p-3 bg-white rounded-md mt-2"}>
                            <span className={"text-xs text-black"}>
                                {chatting}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="you" className={"flex my-5"}>
                    <div className={"ml-3"}>
                        <p id="nickname" className={"text-xs text-white"}>
                            {chatNick}
                        </p>
                        <div id="chatting" className={"p-3 bg-white rounded-md mt-2"}>
                            <span className={"text-xs text-black"}>
                                {chatting}
                            </span>
                        </div>
                    </div>
                    <div id="time" className={"flex flex-col justify-end ml-3"}>
                        <p className={"text-xs text-black"}>{time}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ChattingComponents;
