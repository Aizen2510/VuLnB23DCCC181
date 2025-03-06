import { useState } from "react";
import { Subject } from "../../services/intertestQuets/Subject";

export const useManageQuestions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [credit, setCredit] = useState<number>(0);
    const [addSub, setAddSub] = useState<Subject[]>(() => {
        // Lấy dữ liệu đã lưu từ localStorage
        const localData = localStorage.getItem("subjects");
        return localData ? JSON.parse(localData) : [];
    });

    const addSubject = () => {
        if (!subjectName || credit <= 0) {
            alert("Vui lòng nhập môn học và số tín chỉ hợp lệ");
            return;
        }

        // Sinh số ngẫu nhiên 3 chữ số mỗi lần thêm
        const randomId = Math.floor(Math.random() * 1000).toString().padStart(3, "0");

        const newSubject: Subject = {
            subjectId: "INT" + randomId,
            subjectName,
            credit,
            knowledgeBlock: [""],
        };

        const updatedData = [...addSub, newSubject];
        setAddSub(updatedData);

        // Lưu vào localStorage
        localStorage.setItem("subjects", JSON.stringify(updatedData));

        // Reset input sau khi thêm
        setSubjectName("");
        setCredit(0);
        setIsModalOpen(false);
    };

    return {
        addSub,
        addSubject,
        isModalOpen,
        setIsModalOpen,
        subjectName,
        setSubjectName,
        credit,
        setCredit,
    };
};
