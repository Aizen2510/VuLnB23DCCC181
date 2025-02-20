// SubjectManagement.tsx
import { Button, Card, Col, Form, Input, Row } from 'antd';
import styles from './index.less';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import SubInfor from './components/learn';

export default function SubjectManagement() {
  const [form] = Form.useForm();
  const { subs, currentSubs, getSubsList, addSub, startEdit, editSub, finishEdit, deleteSub } = useModel('Subject');
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);

  useEffect(() => {
    getSubsList();
  }, []);

  const handleSubmit = (values: { name: string }) => {
    if (currentSubs) {
      editSub(values.name);
      finishEdit();
    } else {
      addSub(values.name);
    }
    form.resetFields();
  };

  const handleCardClick = (sub: any) => {
    setSelectedSub(sub);
    setOpenForm(true);
  };

  return (
    <div className={styles.SubjectContainer}>
      <h1 className={styles.title}>Quản Lí môn Học</h1>
      <Form form={form} onFinish={handleSubmit} className={styles.form}>
        <Form.Item name="name" rules={[{ required: true, message: 'Làm ơn Thêm 1 môn học' }]}> 
          <Input placeholder="Nhập Một Môn Học" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          <PlusOutlined />
        </Button>
      </Form>
      <Row gutter={[16, 16]}>
        {subs.map((sub) => (
          <Col span={6} key={sub.id}>
            <Card title={sub.name} onClick={() => handleCardClick(sub)}>
              <Button type="text" icon={<EditOutlined />} onClick={() => startEdit(sub.id)} />
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => deleteSub(sub.id)} />
            </Card>
          </Col>
        ))}
      </Row>
      {openForm && selectedSub && (
        <SubInfor sub2={[selectedSub]} onClone={() => setOpenForm(false)} onEdit={startEdit} onDelete={deleteSub} />
      )}
    </div>
  );
}
