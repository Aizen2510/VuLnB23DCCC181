import { useState } from "react";
import { Exam } from "../../services/intertestQuets/Exam";
import { Questions } from "../../services/intertestQuets/Quetions";
import { QuestionsLevel } from "../../services/intertestQuets/Quetions";

export const useManageExam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState<number>(0);
    const [level, setLevel] = useState<QuestionsLevel>("Dễ");
    const [knowledgeBlock, setKnowledgeBlock] = useState<string>("");
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [examList, setExamList] = useState<Exam[]>([]);
    const [savedStructures, setSavedStructures] = useState<Exam[]>([]);
    const [error, setError] = useState<string>("");
    const [questionBank, setQuestionBank] = useState<Questions[]>([  
        { id: 1, content: "Câu hỏi 1", subject: "Toán", level: "Dễ", knowledgeBlock: "Hàm số" },  
        { id: 2, content: "Câu hỏi 2", subject: "Văn", level: "Trung Bình", knowledgeBlock: "Thơ" },  
        { id: 3, content: "Câu hỏi 3", subject: "Lý", level: "Khó", knowledgeBlock: "Điện" },  
        { id: 4, content: "Câu hỏi 4", subject: "Hóa", level: "Cực Khó", knowledgeBlock: "Phản ứng" },  
        { id: 5, content: "Câu hỏi 5", subject: "Sinh", level: "Dễ", knowledgeBlock: "Gen" }  
    ]);

    const searchQuestions = (subject: string, level?: QuestionsLevel, knowledgeBlock?: string): Questions[] => {
        return questionBank.filter(q =>
            q.subject === subject &&
            (!level || q.level === level) &&
            (!knowledgeBlock || q.knowledgeBlock === knowledgeBlock)
        );
    };

    const fetchRandomQuestions = (quantity: number, level: QuestionsLevel, knowledgeBlock: string): Questions[] => {
        let filteredQuestions = questionBank.filter(q => q.level === level && q.knowledgeBlock === knowledgeBlock);
        return filteredQuestions.slice(0, quantity);
    };

    const handleAddExam = () => {
        if (quantity < 3) {
            setError("Số lượng câu hỏi phải từ 3 trở lên.");
            return;
        }

        const selectedQuestions = fetchRandomQuestions(quantity, level, knowledgeBlock);
        if (selectedQuestions.length < quantity) {
            setError("Không đủ câu hỏi phù hợp trong ngân hàng.");
            return;
        }

        const newExam: Exam = {
            quantity,
            level,
            knowledgeBlock,
            questions: selectedQuestions,
        };

        setExamList([...examList, newExam]);
        setQuantity(0);
        setLevel("Dễ");
        setKnowledgeBlock("");
        setQuestions([]);
        setIsModalOpen(false);
        setError("");
    };

    const saveExamStructure = () => {
        const structure: Exam = { quantity, level, knowledgeBlock, questions };
        setSavedStructures([...savedStructures, structure]);
    };

    const loadExamStructure = (index: number) => {
        const structure = savedStructures[index];
        if (structure) {
            setQuantity(structure.quantity);
            setLevel(structure.level);
            setKnowledgeBlock(structure.knowledgeBlock);
            setQuestions(fetchRandomQuestions(structure.quantity, structure.level, structure.knowledgeBlock));
        }
    };

    return {
        isModalOpen,
        setIsModalOpen,
        quantity,
        setQuantity,
        level,
        setLevel,
        knowledgeBlock,
        setKnowledgeBlock,
        questions,
        setQuestions,
        examList,
        savedStructures,
        handleAddExam,
        saveExamStructure,
        loadExamStructure,
        searchQuestions,
        error,
        setError,
    };
};

export default useManageExam;
