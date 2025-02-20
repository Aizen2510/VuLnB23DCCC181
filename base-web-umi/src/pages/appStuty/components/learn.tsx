import { Form, Input, InputNumber, TimePicker, Button, Progress, Card, Modal } from 'antd';
import { useState } from 'react';
import './learn.less';
// khai cac doi tuong mon hoc 
interface sub {
    id: string; 
    name: string;
    timedate: string;
    time: string; 
    content: string;
    note?: string | null;
}
// khai cac doi tuong muc tieu mon hoc 
interface subGoat{
    monTager: number;
    coutnStudy: number;
    specGoat: string; 
}
// chinh sua cac doi tuong 
interface subEdit{
    sub2: sub[];
    onClone: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}


export default function subInfor({sub2, onClone, onEdit, onDelete}: subEdit){
    // thay doi cac doi tuong mon hoc
    const [form] = Form.useForm();
    const [subData, setSubData] = useState<sub>({
        id: sub2[0]?.id  || '',
        name: sub2[0]?.name || '',
        timedate: sub2[0]?.timedate || '',
        time: sub2[0]?.time || '',
        content: sub2[0]?.content || '',
        note: sub2[0]?.note || '',
    });
    // truyen gia tri vao cac doi tuong
    const [goat, setGoat] = useState<subGoat>({
        monTager: 5,
        coutnStudy: 2,
        specGoat: "Cần Phải Học Nhiều Hơn Nữa",  
    })
    // thuc hien hanh dong chi sua mon hoc 
    const handleChangInput = (field: keyof sub, value: string) => {
        setSubData((prev) => ({
            ...prev, 
            [field]: value,
        }))
    }
    const handleSave = (values: any) => {
		console.log('Saved values:', values);
		onClone();
	};
    const handleChangGoat = (field: keyof subGoat, value: string | number)=> {
        setGoat((prev)=>({
            ...prev,
            [field]: value,
        }))
    }


    const progressPercentage = (goat.coutnStudy/goat.monTager)*100;
    return (
        <div>
            <div className="subject-modal">
                <div className="subject-modal__overlay" onClick={onClone} />
                <div className="subject-modal__content">
                    <div className="subject-modal__header">
                    <h4>Thông tin môn học</h4>
                    <button className="close-button" onClick={onClone}>
                        ×
                    </button>
                    </div>

                    <div className="subject-modal__body">
                    <div className="form-section">
                        <div className="form-group">
                        <label className="form-group__label">Tên Môn học</label>
                        <input
                            className="form-group__input"
                            value={subData.name}
                            onChange={(e) => handleChangInput("name", e.target.value)}
                            placeholder="Enter subject name"
                            title="Subject Name"
                        />
                        </div>

                        <div className="form-section__grid form-section__grid--two-cols">
                        <div className="form-group">
                            <label className="form-group__label">Giờ Học</label>
                            <input
                            className="form-group__input"
                            type="time"
                            value={subData.time || ""}
                            onChange={(e) => handleChangInput("time", e.target.value)}
                            placeholder="Enter class time"
                            title="Class Time"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-group__label">Thời gian học(phút)</label>
                            <input
                            className="form-group__input"
                            type="number"
                            value={subData.timedate || ""}
                            onChange={(e) => handleChangInput("timedate", e.target.value)}
                            placeholder="Nhập thời gian"
                            title="Duration"
                            />
                        </div>
                        </div>

                        <div className="form-group">
                        <label className="form-group__label">Nội dung môn học</label>
                        <textarea
                            className="form-group__textarea"
                            value={subData.content || ""}
                            onChange={(e) => handleChangInput("content", e.target.value)}
                            rows={4}
                            title="Content"
                            placeholder="Nhập nội dung môn học"
                        />
                        </div>

                        <div className="form-group">
                        <label className="form-group__label">Ghi chú</label>
                        <textarea
                            className="form-group__textarea"
                            value={subData.note || ""}
                            onChange={(e) => handleChangInput("note", e.target.value)}
                            rows={3}
                            title="Notes"
                            placeholder="Nhập ghi chú"
                        />
                        </div>
                    </div>

                    <div className="goals-section">
                        <h3 className="form-section__title">Mục tiêu học tập</h3>

                        <div className="form-group">
                        <label className="form-group__label">Mục tiêu nghiên cứu hàng tháng (giờ)</label>
                        <input
                            className="form-group__input"
                            type="number"
                            value={goat.monTager}
                            onChange={(e) => handleChangGoat("monTager", Number.parseInt(e.target.value))}
                            title="Monthly Study Target"
                            placeholder="Enter monthly study target"
                        />
                        </div>

                        <div className="goals-section__progress">
                        <label className="form-group__label">Tiến trình</label>
                        <div className="goals-section__progress-bar">
                            <div className="goals-section__progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
                        </div>
                        <p className="goals-section__progress-text">
                            {goat.monTager} of {goat.monTager} Tiến trình({Math.round(progressPercentage)}%)
                        </p>
                        </div>

                        <div className="form-group">
                        <label className="form-group__label">Mục tiêu cụ thể</label>
                        <textarea
                            className="form-group__textarea"
                            value={goat. specGoat}
                            onChange={(e) => handleChangGoat("specGoat", e.target.value)}
                            rows={3}
                            title="Specific Goals"
                            placeholder="Enter specific goals"
                        />
                        </div>

                        <div className="goals-section__status">
                        <h4 className="goals-section__status-title">Goal Status</h4>
                        <p
                            className={`goals-section__status-text ${
                            progressPercentage >= 100 ? "goals-section__status-text--success" : ""
                            }`}
                        >
                            {progressPercentage >= 100
                            ? " Chúc mừng bạn đã hoàn thành mục tiêu"
                            : ` Bạn đã hoàn thành mục tiêu ${Math.round(100 - progressPercentage)}%, hãy tiếp tục cố gắng`}
                        </p>
                        </div>
                    </div>
                    </div>

                    <div className="subject-modal__footer">
                    <button className="button button--secondary" onClick={onClone}>
                        Cancel
                    </button>
                    <button className="button button--primary" onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
                </div>
        </div>
    )
};



