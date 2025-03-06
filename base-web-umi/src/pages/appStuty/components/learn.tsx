import { Form, Input, InputNumber, TimePicker, Button, Progress, Modal } from 'antd';
import { useState, useEffect } from 'react';
import './learn.less';
import moment from 'moment';

// Định nghĩa interface cho môn học
interface Sub {
    id: string;
    name: string;
    timedate: string;
    time: string;
    content: string;
    note?: string | null;
}

// Định nghĩa interface cho mục tiêu học tập
interface SubGoal {
    monTarget: number;
    countStudy: number;
    specGoal: string;
}

// Định nghĩa interface cho component
interface SubEdit {
    sub2: Sub[];
    onClone: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}// tach ra file rieng 

export default function SubInfor({ sub2, onClone, onEdit, onDelete }: SubEdit) {
    const [form] = Form.useForm();
    const [subData, setSubData] = useState<Sub>({
        id: sub2[0]?.id || '',
        name: sub2[0]?.name || '',
        timedate: sub2[0]?.timedate || '',
        time: sub2[0]?.time || '',
        content: sub2[0]?.content || '',
        note: sub2[0]?.note || '',
    });

    const [goal, setGoal] = useState<SubGoal>({
        monTarget: 100,
        countStudy: 100,
        specGoal: "Cần Phải Học Nhiều Hơn Nữa",
    });

    useEffect(() => {
        setSubData({
            id: sub2[0]?.id || '',
            name: sub2[0]?.name || '',
            timedate: sub2[0]?.timedate || '',
            time: sub2[0]?.time || '',
            content: sub2[0]?.content || '',
            note: sub2[0]?.note || '',
        });
    }, [sub2]);
    // cập nhât thông tin môn học khi co su thay doi trong sub2
    const handleChangeInput = (field: keyof Sub, value: string) => {
        setSubData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeGoal = (field: keyof SubGoal, value: string | number) => {
        setGoal((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const updatedSub = { ...subData };
        const subsString = localStorage.getItem('subs');
        const subsObj: Sub[] = JSON.parse(subsString || '[]');
        const newSubsObj = subsObj.map((sub) => (sub.id === updatedSub.id ? updatedSub : sub));
        localStorage.setItem('subs', JSON.stringify(newSubsObj));
        onClone(); // 
    };
    //Được sử dụng để tính tỷ lệ phần trăm tiến độ hoàn thành mục tiêu học tập.

//Giải thích:
//goal.countStudy: Là số giờ mà người học đã dành ra để học.
//goal.monTarget: Là tổng số giờ mục tiêu học tập trong một khoảng thời gian nhất định
    const progressPercentage = (goal.countStudy / goal.monTarget);

    return (
        <div>
            <div className="subject-modal">
                <div className="subject-modal__overlay" onClick={onClone} />
                <div className="subject-modal__content">
                    <div className="subject-modal__header">
                        <h4>Thông tin môn học</h4>
                        <button className="close-button" onClick={onClone}>×</button>
                    </div>

                    <div className="subject-modal__body">
                        <Form form={form} layout="vertical">
                            <Form.Item label="Tên Môn học">
                                <Input
                                    value={subData.name}
                                    onChange={(e) => handleChangeInput("name", e.target.value)}
                                    placeholder="Nhập tên môn học"
                                />
                            </Form.Item>

                            <Form.Item label="Giờ Học">
                                <TimePicker
                                    value={subData.time ? moment(subData.time, 'HH:mm') : null}
                                    onChange={(time, timeString) => handleChangeInput("time", timeString)}
                                    format="HH:mm"
                                    placeholder="Chọn giờ học"
                                />
                            </Form.Item>

                            <Form.Item label="Thời gian học (phút)">
                                <InputNumber
                                    value={subData.timedate}
                                    onChange={(value) => handleChangeInput("timedate", String(value))}
                                    min="0"
                                    placeholder="Nhập thời gian học"
                                />
                            </Form.Item>

                            <Form.Item label="Nội dung môn học">
                                <Input.TextArea
                                    value={subData.content}
                                    onChange={(e) => handleChangeInput("content", e.target.value)}
                                    placeholder="Nhập nội dung môn học"
                                />
                            </Form.Item>

                            <Form.Item label="Ghi chú">
                                <Input.TextArea
                                    value={subData.note || ''}
                                    onChange={(e) => handleChangeInput("note", e.target.value)}
                                    placeholder="Nhập ghi chú"
                                />
                            </Form.Item>

                            <Form.Item label="Mục tiêu nghiên cứu hàng tháng (giờ)">
                                <InputNumber
                                    value={goal.monTarget}
                                    onChange={(value) => handleChangeGoal("monTarget", value ?? 0)}
                                    min={0}
                                    placeholder="Nhập mục tiêu nghiên cứu hàng tháng"
                                />
                            </Form.Item>

                            <div className="goals-section__progress-bar">
                                <Progress
                                    percent={progressPercentage}
                                    status="active"
                                />
                            </div>
                            <p>{Math.round(progressPercentage)}% hoàn thành</p>
                        </Form>
                    </div>

                    <div className="subject-modal__footer">
                        <Button className="button button--secondary" onClick={onClone}>Hủy</Button>
                        <Button type="primary" className="button button--primary" onClick={handleSave}>Lưu thay đổi</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
