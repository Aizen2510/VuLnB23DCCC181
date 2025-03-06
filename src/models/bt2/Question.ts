import { useState, useEffect } from 'react';

export enum QuestionLevel {
    Easy = 'Dễ',
    Medium = 'Trung Bình',
    Hard = 'Khó',
    VeryHard = 'Cực Khó'
}

export interface Question {
    questionId: string;
    subject: string;
    content: string;
    level: QuestionLevel;
    knowledgeBlock: string;
}

export const useQuestionModel = () => {
    const [questions, setQuestions] = useState<Question[]>(() => {
        // Lấy dữ liệu từ localStorage và xử lý lỗi nếu có
        const savedQuestions = localStorage.getItem('questions');
        try {
            return savedQuestions ? JSON.parse(savedQuestions) : [];
        } catch (error) {
            console.error('Error parsing saved questions from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        // Chỉ lưu vào localStorage khi mảng questions thay đổi
        if (questions.length > 0) {
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }, [questions]);

    // Hàm thêm câu hỏi
    const addQuestion = (question: Question) => {
        setQuestions((prev) => [...prev, question]);
    };

    // Hàm tìm kiếm câu hỏi theo môn học
    const searchBySubject = (subject: string) => {
        return questions.filter(q => q.subject.toLowerCase().includes(subject.toLowerCase()));
    };

    // Hàm tìm kiếm câu hỏi theo mức độ khó
    const searchByLevel = (level: QuestionLevel) => {
        return questions.filter(q => q.level === level);
    };

    // Hàm tìm kiếm câu hỏi theo khối kiến thức
    const searchByKnowledgeBlock = (knowledgeBlock: string) => {
        return questions.filter(q => q.knowledgeBlock.toLowerCase().includes(knowledgeBlock.toLowerCase()));
    };

    return { questions, addQuestion, searchBySubject, searchByLevel, searchByKnowledgeBlock };
};
