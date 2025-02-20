import { Form, Input, InputNumber, TimePicker, Button, Progress, Card, Modal } from 'antd';
import { useState, useEffect } from 'react';
import './learn.less';

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
}

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
        monTarget: 5,
        countStudy: 2,
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
        onClone();
    };

    const progressPercentage = (goal.countStudy / goal.monTarget) * 100;

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
                        <div className="form-group">
                            <label>Tên Môn học</label>
                            <input
                                title="Tên Môn học"
                                value={subData.name}
                                onChange={(e) => handleChangeInput("name", e.target.value)}
                                placeholder="Nhập tên môn học"
                            />
                        </div>

                        <div className="form-group">
                            <label>Giờ Học</label>
                            <input
                                title="nq"
                                type="time"
                                value={subData.time}
                                onChange={(e) => handleChangeInput("time", e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Thời gian học (phút)</label>
                            <input
                                title="time"
                                type="number"
                                value={subData.timedate}
                                onChange={(e) => handleChangeInput("timedate", e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nội dung môn học</label>
                            <textarea
                                value={subData.content}
                                onChange={(e) => handleChangeInput("content", e.target.value)}
                                placeholder="Nhập nội dung môn học"
                            />
                        </div>

                        <div className="form-group">
                            <label>Ghi chú</label>
                            <textarea
                                title="Ghi chú"
                                value={subData.note || ""}
                                onChange={(e) => handleChangeInput("note", e.target.value)}
                                placeholder="Nhập ghi chú"
                            />
                        </div>

                        <div className="goals-section">
                            <label>Mục tiêu nghiên cứu hàng tháng (giờ)</label>
                            <input
                                title="Mục tiêu nghiên cứu hàng tháng"
                                type="number"
                                value={goal.monTarget}
                                onChange={(e) => handleChangeGoal("monTarget", Number.parseInt(e.target.value))}
                                placeholder="Nhập mục tiêu nghiên cứu hàng tháng"
                            />

                            <div className="goals-section__progress-bar">
                                <div className="goals-section__progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
                            </div>
                            <p>{Math.round(progressPercentage)}% hoàn thành</p>
                        </div>
                    </div>

                    <div className="subject-modal__footer">
                        <button className="button button--secondary" onClick={onClone}>Hủy</button>
                        <button className="button button--primary" onClick={handleSave}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
