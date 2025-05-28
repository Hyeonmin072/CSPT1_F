import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../sign/axios/AxiosInstance";
import BusinessHeader from "../../common/BusinessHeader";
import Swal from "sweetalert2";
import { ChevronLeft } from "lucide-react";

const Label = ({ children }) => (
    <p className="text-sm font-semibold text-gray-700 mb-2">{children}</p>
);

const Input = ({ type = "text", placeholder, value, onChange }) => (
    <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={onChange}
    />
);

const RadioGroup = ({ options, selected, onChange }) => (
    <div className="flex items-center space-x-6">
        {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="type"
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                    checked={selected === option.value}
                    onChange={() => onChange(option.value)}
                />
                <span className="text-gray-700">{option.label}</span>
            </label>
        ))}
    </div>
);

const FormSection = ({ title, children }) => (
    <div className="mb-8">
        <Label>{title}</Label>
        {children}
    </div>
);

export default function EventCouponCreate() {
    const navigate = useNavigate();
    const [view, setView] = useState("menu");
    const [newCoupon, setNewCoupon] = useState({
        name: "",
        getDate: "",
        useDate: 0,
        type: "",
        price: 0,
    });
    const [newEvent, setNewEvent] = useState({
        name: "",
        price: 0,
        type: "",
        startDate: "",
        endDate: "",
    });

    const handleCouponSubmit = async () => {
        if (!newCoupon.name || !newCoupon.getDate || !newCoupon.useDate || !newCoupon.type || !newCoupon.price) {
            Swal.fire({
                title: "입력 오류",
                text: "모든 필드를 올바르게 입력해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }
    
        try {
            const response = await axiosInstance.post("/shop/coupon", newCoupon);
            console.log("쿠폰 등록 성공:", response.data);
    
            Swal.fire({
                title: "쿠폰 등록 성공!",
                text: "쿠폰이 성공적으로 등록되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            });
    
            setView("menu");
        } catch (error) {
            console.error("쿠폰 등록 실패:", error);
    
            Swal.fire({
                title: "쿠폰 등록 실패",
                text: error.response?.data || "쿠폰 등록에 실패했습니다. 다시 시도해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    };
    
    const handleEventSubmit = async () => {
        if (!newEvent.name || !newEvent.price || !newEvent.type || !newEvent.startDate || !newEvent.endDate) {
            Swal.fire({
                title: "입력 오류",
                text: "모든 필드를 올바르게 입력해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }
    
        const formattedEvent = {
            ...newEvent,
            startDate: newEvent.startDate.replace(/-/g, ""),
            endDate: newEvent.endDate.replace(/-/g, ""),
        };
    
        try {
            const response = await axiosInstance.post("/shop/event", formattedEvent);
            console.log("이벤트 등록 성공:", response.data);
    
            Swal.fire({
                title: "이벤트 등록 성공!",
                text: "이벤트가 성공적으로 등록되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            });
    
            setView("menu");
        } catch (error) {
            console.error("이벤트 등록 실패:", error);
    
            Swal.fire({
                title: "이벤트 등록 실패",
                text: "이벤트 등록에 실패했습니다. 다시 시도해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    };

    return (
        <>
            <BusinessHeader />
    
            <div className="max-w-6xl bg-gray-50 mx-auto p-8 mt-20 min-h-[700px] w-full">
                {/* Header: 고정된 버튼 */}
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="flex flex-row space-x-2">
                        <ChevronLeft 
                        className="cursor-pointer"
                        onClick={() => navigate("/eventmenu")}/>
                        <h1 className="text-lg font-bold text-center mb-6">이벤트 및 쿠폰 등록</h1>
                    </div>
                    
                    <div className="flex flex-row space-x-2">
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => setView("event")}
                        >
                            이벤트 등록
                        </button>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => setView("coupon")}
                        >
                            쿠폰 등록
                        </button>
                    </div>
                </div>
    
                {/* Main Content: view에 따라 변경 */}
                {view === "menu" && (
                    <div>
                        <h2 className="text-xl font-bold">메뉴를 선택하세요</h2>
                    </div>
                )}
    
                {view === "coupon" && (
                    <div>
                        <FormSection title="쿠폰 이름">
                            <Input
                                placeholder="쿠폰 이름"
                                value={newCoupon.name}
                                onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                            />
                        </FormSection>

                        <FormSection title="수령 가능 기간">
                            <Input
                                type="date"
                                value={newCoupon.getDate}
                                onChange={(e) => setNewCoupon({ ...newCoupon, getDate: e.target.value })}
                            />
                        </FormSection>

                        <FormSection title="사용 가능 기간">
                            <Input
                                type="number"
                                placeholder="사용 가능 기간을 입력하세요 (예 : 5)"
                                value={newCoupon.useDate}
                                onChange={(e) => setNewCoupon({ ...newCoupon, useDate: e.target.value })}
                            />
                        </FormSection>

                        <FormSection title="할인 유형">
                            <RadioGroup
                                options={[
                                    { value: "PERCENT", label: "퍼센트 할인 (%)" },
                                    { value: "FIXED", label: "정액 할인 (원)" },
                                ]}
                                selected={newCoupon.type}
                                onChange={(value) => setNewCoupon({ ...newCoupon, type: value })}
                            />
                        </FormSection>

                        {newCoupon.type && (
                            <FormSection title={newCoupon.type === "PERCENT" ? "할인율 (%)" : "할인 금액 (원)"}>
                                <Input
                                    type="number"
                                    placeholder={
                                        newCoupon.type === "PERCENT"
                                            ? "할인율을 입력하세요 (%)"
                                            : "할인 금액을 입력하세요 (원)"
                                    }
                                    value={newCoupon.price || ""}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, price: e.target.value })}
                                />
                            </FormSection>
                        )}

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCouponSubmit}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                            >
                                등록
                            </button>
                            <button
                                onClick={() => setView("menu")}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}

                {view === "event" && (
                    <div>
                        <FormSection title="이벤트 제목">
                            <Input
                                placeholder="이벤트 제목"
                                value={newEvent.name}
                                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                            />
                        </FormSection>

                        <FormSection title="할인 유형">
                            <RadioGroup
                                options={[
                                    { value: "PERCENT", label: "퍼센트 할인 (%)" },
                                    { value: "FIXED", label: "정액 할인 (원)" },
                                ]}
                                selected={newEvent.type}
                                onChange={(value) => setNewEvent({ ...newEvent, type: value })}
                            />
                        </FormSection>

                        <FormSection title="이벤트 할인 금액">
                            <Input
                                type="number"
                                placeholder="할인 금액을 입력하세요 (원)"
                                value={newEvent.price}
                                onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                            />
                        </FormSection>

                        <FormSection title="이벤트 기간">
                            <div className="flex space-x-4">
                                <Input
                                    type="date"
                                    value={newEvent.startDate}
                                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                                />
                                <span className="self-center text-gray-500">~</span>
                                <Input
                                    type="date"
                                    value={newEvent.endDate}
                                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                                />
                            </div>
                        </FormSection>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleEventSubmit}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                            >
                                등록
                            </button>
                            <button
                                onClick={() => setView("menu")}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}