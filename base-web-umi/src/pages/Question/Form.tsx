<<<<<<< HEAD
import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { QuestionLevel } from '../../models/bt2/Question';

const { Option } = Select;

interface QuestionFormProps {
  onSubmit: (values: any) => void;
  questionData?: any; // Dữ liệu câu hỏi nếu sửa
}

const FormQuestion = ({ onSubmit, questionData }: QuestionFormProps) => {
  const [form] = Form.useForm();

  // Khi questionData thay đổi, cập nhật giá trị của form
  useEffect(() => {
    if (questionData) {
      // Đảm bảo rằng các trường dữ liệu được đặt lại đúng
      form.setFieldsValue({
        questionId: questionData.id,
        subject: questionData.subject,
        content: questionData.content,
        level: questionData.difficulty,
        knowledgeBlock: questionData.knowledgeBlock,
      });
    }
  }, [questionData, form]);

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Mã câu hỏi"
        name="questionId"
        rules={[{ required: true, message: 'Mã câu hỏi không thể bỏ trống!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Môn học"
        name="subject"
        rules={[{ required: true, message: 'Môn học không thể bỏ trống!' }]}>
        <Select placeholder="Chọn môn học">
          <Option value="math">Toán</Option>
          <Option value="literature">Văn</Option>
          <Option value="history">Lịch sử</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Nội dung câu hỏi"
        name="content"
        rules={[{ required: true, message: 'Nội dung câu hỏi không thể bỏ trống!' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Mức độ khó: Hiển thị các mức độ bằng tiếng Việt */}
      <Form.Item
        label="Mức độ khó"
        name="level"
        rules={[{ required: true, message: 'Mức độ khó không thể bỏ trống!' }]}>
        <Select placeholder="Chọn mức độ khó">
          <Option value={QuestionLevel.Easy}>Dễ</Option>
          <Option value={QuestionLevel.Medium}>Trung bình</Option>
          <Option value={QuestionLevel.Hard}>Khó</Option>
          <Option value={QuestionLevel.VeryHard}>Rất khó</Option>
        </Select>
      </Form.Item>

      {/* Khối kiến thức */}
      <Form.Item
        label="Khối kiến thức"
        name="knowledgeBlock"
        rules={[{ required: true, message: 'Khối kiến thức không thể bỏ trống!' }]}>
        <Select placeholder="Chọn khối kiến thức">
          <Option value="basic">Cơ bản</Option>
          <Option value="advanced">Nâng cao</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {questionData ? 'Lưu thay đổi' : 'Thêm câu hỏi'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormQuestion;
=======
import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { QuestionLevel } from '@/models/Question';

const { Option } = Select;

interface QuestionFormProps {
  onSubmit: (values: any) => void;
  questionData?: any; // Dữ liệu câu hỏi nếu sửa
}

const FormQuestion = ({ onSubmit, questionData }: QuestionFormProps) => {
  const [form] = Form.useForm();

  // Khi questionData thay đổi, cập nhật giá trị của form
  useEffect(() => {
    if (questionData) {
      // Đảm bảo rằng các trường dữ liệu được đặt lại đúng
      form.setFieldsValue({
        questionId: questionData.id,
        subject: questionData.subject,
        content: questionData.content,
        level: questionData.difficulty,
        knowledgeBlock: questionData.knowledgeBlock,
      });
    }
  }, [questionData, form]);

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Mã câu hỏi"
        name="questionId"
        rules={[{ required: true, message: 'Mã câu hỏi không thể bỏ trống!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Môn học"
        name="subject"
        rules={[{ required: true, message: 'Môn học không thể bỏ trống!' }]}>
        <Select placeholder="Chọn môn học">
          <Option value="math">Toán</Option>
          <Option value="literature">Văn</Option>
          <Option value="history">Lịch sử</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Nội dung câu hỏi"
        name="content"
        rules={[{ required: true, message: 'Nội dung câu hỏi không thể bỏ trống!' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Mức độ khó: Hiển thị các mức độ bằng tiếng Việt */}
      <Form.Item
        label="Mức độ khó"
        name="level"
        rules={[{ required: true, message: 'Mức độ khó không thể bỏ trống!' }]}>
        <Select placeholder="Chọn mức độ khó">
          <Option value={QuestionLevel.Easy}>Dễ</Option>
          <Option value={QuestionLevel.Medium}>Trung bình</Option>
          <Option value={QuestionLevel.Hard}>Khó</Option>
          <Option value={QuestionLevel.VeryHard}>Rất khó</Option>
        </Select>
      </Form.Item>

      {/* Khối kiến thức */}
      <Form.Item
        label="Khối kiến thức"
        name="knowledgeBlock"
        rules={[{ required: true, message: 'Khối kiến thức không thể bỏ trống!' }]}>
        <Select placeholder="Chọn khối kiến thức">
          <Option value="basic">Cơ bản</Option>
          <Option value="advanced">Nâng cao</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {questionData ? 'Lưu thay đổi' : 'Thêm câu hỏi'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormQuestion;
>>>>>>> 992b7e474ab2c11ae910f15903888a44b97b3bc2
