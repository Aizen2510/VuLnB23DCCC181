import { Button, Card, Col, Form, Input, Row } from 'antd';
import styles from './index.less';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import SubInfor from './components/learn';

export default function SubjectManagement() {
  const [form] = Form.useForm();
  const { 
    subs, 
    currentSubs, 
    getSubsList, 
    addSub, 
    updateSubStatus, 
    startEdit, 
    editSub, 
    finishEdit, 
    deleteSub 
  } = useModel('Subject');
  
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);

  useEffect(() => {
    if (currentSubs) {
      form.setFieldsValue({ name: currentSubs.name });
    } else {
      form.resetFields();
    }
  }, [currentSubs, form]);

  useEffect(() => {
    getSubsList();
  }, []);

  const handleSubmit = (values: { name: string }) => {
    if (currentSubs) {
      finishEdit();
    } else {
      addSub(values.name);
    }
    form.resetFields();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentSubs) {
      editSub(e.target.value);
    }
  };

  const handleCardClick = (sub: any) => {
    setSelectedSub(sub);
    setOpenForm(true);
  };

  const handleCloseDetails = () => {
    setOpenForm(false);
    setSelectedSub(null);
  };

  const handleEditFromTable = (id: string) => {
    startEdit(id);
    setOpenForm(false);
  };

  const handleDeleteFromTable = (id: string) => {
    deleteSub(id);
    setOpenForm(false);
  };

  return (
    <div className={styles.SubjectContainer}>
      <div className={styles.inputContainer}>
        <h1 className={styles.title}>Quản Lí môn Học</h1>
        <Form form={form} onFinish={handleSubmit} className={styles.form}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Làm ơn Thêm 1 môn học',
              },
            ]}
          >
            <Input placeholder="Nhập Một Môn Học" onChange={onChangeInput} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className={styles.buttonInput}>
            <PlusOutlined />
          </Button>
        </Form>
      </div>
      
      <div className="subjectListContainer">
        <Row gutter={[16, 16]}>
            {subs.map((sub) => (
            <Col span={6} key={sub.id}>
              <Card 
              title={sub.name}  
              className={styles.cardSub} 
              style={{
                cursor: 'pointer'
              }}
              onClick={() => handleCardClick(sub)}
              >
              <div className={styles.actionButton}>
                <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  startEdit(sub.id);
                }} 
                />
                <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  deleteSub(sub.id);
                }} 
                />
              </div>
              </Card>
            </Col>
            ))}
        </Row>
      </div>

      {openForm && selectedSub && (
        <SubInfor
          sub2={[selectedSub]} 
          onClone={handleCloseDetails}
          onEdit={handleEditFromTable}
          onDelete={handleDeleteFromTable}
          // onSave={handleSubmit}
        />
      )}
    </div>
  );
}
