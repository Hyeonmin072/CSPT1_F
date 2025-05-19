import { useEffect, useState } from "react";
import axiosInstance from "../sign/axios/AxiosInstance";
export default function DesignerID({ designer }) {
    const [designerid, setDesignerId] = useState("1");
    useEffect(() => {
        const fetchDesignerData = async () => {
            try {
                // const response = await axiosInstance.get("/designer/profile"); // 이후 변경
                // const data = response.data;
                setDesignerId(data);
            } catch (error) {
                console.error("Failed to fetch designer data:", error);
            }
        };

        fetchDesignerData();
    }, []);

    if (!designerid) {
        return (
            <div className="fixed bottom-4 right-4 text-green-400 opacity-75 text-green-400 px-4 py-2 rounded-md text-sm z-50">
                Loading...
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 text-green-400 opacity-75 text-green-400 px-4 py-2 rounded-md text-sm z-50">
            ID: {designerid.id}
        </div>
    );
}
