import React, { useState } from 'react';
import { Button, Form, InputNumber, Modal, Radio, Select, Input} from "antd";
import { useManageExam } from '../../models/bt2/managetExam';

const { Option } = Select;

const levels = ["Dễ", "Trung Bình", "Khó", "Cực Khó"];

const ExamManagement = () => {
    const { isModalOpen, setIsModalOpen, quantity, setQuantity, level, setLevel, knowledgeBlock, setKnowledgeBlock, handleAddExam, error, setError } = useManageExam();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    
    const onConfirm = () => {
        if (quantity < 3) {
            setError("Số lượng câu hỏi phải từ 3 trở lên");
            return;
        }
        handleAddExam();
    };

    return (
        <div>
            <h1>Quản Lí Đề Thi</h1>
            <Button type="primary" onClick={showModal}>Tạo Đề Thi</Button>
            <Modal title="Tạo Đề Thi" visible={isModalOpen} onCancel={handleCancel} onOk={onConfirm}>
                <Form>
                    <Form.Item label="Mức Độ">
                        <Radio.Group value={level} onChange={(e) => setLevel(e.target.value)}>
                            {levels.map(lvl => <Radio key={lvl} value={lvl}>{lvl}</Radio>)}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Khối Kiến Thức">
                      <Input
                          placeholder="Nhập Khối Kiến Thức"
                      />
                    </Form.Item>
                    <Form.Item label="Số Lượng Câu Hỏi">
                        <InputNumber min={3} max={100} value={quantity} onChange={(value) => setQuantity(value ?? 3)} />
                    </Form.Item>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
            </Modal>
        </div>
    );
};

export default ExamManagement;
