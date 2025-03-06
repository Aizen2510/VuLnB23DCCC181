export type QuestionsLevel = "Dễ" | "Trung Bình" | "Khó" | "Cực Khó";

export interface Question {
    id: number;
    content: string;
    subject: string;
    level: string;
    knowledgeBlock: string;
}
