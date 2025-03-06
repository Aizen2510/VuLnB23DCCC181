import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import FormQuestion from './Form';
import QuestionSearch from './Search';

interface Question {
  id: string;
  subject: string;
  content: string;
  difficulty: string;
  knowledgeBlock: string;
}

// Dữ liệu câu hỏi mẫu
// const mockData: Question[] = [
//   { id: '1', subject: 'math', content: 'Giải phương trình bậc nhất', difficulty: 'easy', knowledgeBlock: 'basic' },
//   { id: '2', subject: 'literature', content: 'Phân tích bài thơ Tự tình', difficulty: 'medium', knowledgeBlock: 'advanced' },
//   { id: '3', subject: 'history', content: 'Tìm hiểu về chiến tranh thế giới thứ 2', difficulty: 'hard', knowledgeBlock: 'advanced' },
//   { id: '4', subject: 'math', content: 'Giải bài toán xác suất', difficulty: 'medium', knowledgeBlock: 'basic' },
//   { id: '5', subject: 'literature', content: 'Giải thích câu nói của Hồ Chí Minh', difficulty: 'easy', knowledgeBlock: 'advanced' },
// ];

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });
  const [visible, setVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleSearch = (filters: any) => {
    const filteredQuestions = questions.filter((question) => {
      return (
        (!filters.subject || question.subject === filters.subject) &&
        (!filters.difficulty || question.difficulty === filters.difficulty) &&
        (!filters.knowledgeBlock || question.knowledgeBlock === filters.knowledgeBlock)
      );
    });
    setQuestions(filteredQuestions);
  };

  const handleEdit = (record: Question) => {
    setEditingQuestion(record);
    setVisible(true);
  };

  const handleAddOrEdit = (values: any) => {
    let updatedQuestions;
    if (editingQuestion) {
      // Cập nhật câu hỏi
      updatedQuestions = questions.map((question) =>
        question.id === editingQuestion.id ? { ...editingQuestion, ...values } : question
      );
    } else {
      // Thêm câu hỏi mới
      updatedQuestions = [...questions, { ...values, id: String(questions.length + 1) }];
    }

    setQuestions(updatedQuestions);
    setVisible(false);
    setEditingQuestion(null);
  };

  const columns = [
    { title: 'Mã câu hỏi', dataIndex: 'id', key: 'id' },
    { title: 'Môn học', dataIndex: 'subject', key: 'subject' },
    { title: 'Nội dung câu hỏi', dataIndex: 'content', key: 'content' },
    { title: 'Mức độ khó', dataIndex: 'difficulty', key: 'difficulty' },
    { title: 'Khối kiến thức', dataIndex: 'knowledgeBlock', key: 'knowledgeBlock' },
    {
      title: 'Hành động',
      key: 'action',
      render: (text: any, record: Question) => (
        <Button onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
      ),
    },
  ];

  const handleAdd = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        Thêm câu hỏi
      </Button>

      <div style={{ marginTop: 20 }}>
        {/* Pass handleSearch as a prop to QuestionSearch */}
        <QuestionSearch onSearch={handleSearch} />
      </div>

      <Table dataSource={questions} columns={columns} rowKey="id" />

      <Modal
        title={editingQuestion ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <FormQuestion onSubmit={handleAddOrEdit} questionData={editingQuestion} />
      </Modal>
    </div>
  );
};

export default Index;
