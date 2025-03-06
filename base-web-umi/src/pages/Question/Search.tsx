import React, { useState } from 'react';
import { Input, Select, Button, List } from 'antd';
import { useQuestionModel, QuestionLevel } from '@/models/Question';

const { Option } = Select;

interface QuestionSearchProps {
  onSearch: (filters: any) => void;
}

const QuestionSearch: React.FC<QuestionSearchProps> = ({ onSearch }) => {
  const { questions, searchBySubject, searchByLevel, searchByKnowledgeBlock } = useQuestionModel();
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState<QuestionLevel | undefined>(undefined);
  const [knowledgeBlock, setKnowledgeBlock] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const handleSearch = () => {
    let result = questions;
    if (subject) {
      result = searchBySubject(subject);
    }
    if (level) {
      result = searchByLevel(level);
    }
    if (knowledgeBlock) {
      result = searchByKnowledgeBlock(knowledgeBlock);
    }
    setFilteredQuestions(result);
    onSearch(result);  // Gọi hàm onSearch khi tìm kiếm xong
  };

  return (
    <div>
      <h1>Tìm kiếm câu hỏi</h1>
      <Input placeholder="Môn học" value={subject} onChange={e => setSubject(e.target.value)} />
      <Select placeholder="Mức độ khó" value={level} onChange={value => setLevel(value as QuestionLevel)}>
        <Option value={QuestionLevel.Easy}>Dễ</Option>
        <Option value={QuestionLevel.Medium}>Trung bình</Option>
        <Option value={QuestionLevel.Hard}>Khó</Option>
        <Option value={QuestionLevel.VeryHard}>Rất khó</Option>
      </Select>
      <Input placeholder="Khối kiến thức" value={knowledgeBlock} onChange={e => setKnowledgeBlock(e.target.value)} />
      <Button onClick={handleSearch}>Tìm kiếm</Button>
      <List
        dataSource={filteredQuestions}
        renderItem={item => (
          <List.Item key={item.questionId}>
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionSearch;
