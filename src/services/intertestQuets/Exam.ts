import { Question, QuestionsLevel } from './Quetions';

export interface Exam {
    id: number;
    subject: string;
    quantity: number;
    level: QuestionsLevel;
    knowledgeBlock: string;
    questions: Question[];
}
