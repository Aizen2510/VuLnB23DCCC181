import { Button, Form, Input, Modal, InputNumber, Table } from "antd";
import type { InputNumberProps } from "antd";
import { useManageQuestions } from "../../models/bt2/managetSubject";

const index = () => {
    // Sử dụng hook chung để đồng bộ dữ liệu
    const { addSub, addSubject, isModalOpen, setIsModalOpen, subjectName, setSubjectName, credit, setCredit } = useManageQuestions();

    // Mở modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Xác nhận thêm môn học
    const handleOk = () => {
        addSubject(); // Gọi hàm xử lý
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Cập nhật số tín chỉ
    const onChange: InputNumberProps["onChange"] = (value) => {
        setCredit(Number(value) || 0);
    };

    // Cấu hình bảng hiển thị danh sách môn học
    const columns = [
        {
            title: "Mã Môn Học",
            dataIndex: "subjectId",
            key: "subjectId",
        },
        {
            title: "Tên Môn Học",
            dataIndex: "subjectName",
            key: "subjectName",
        },
        {
            title: "Số Tín Chỉ",
            dataIndex: "credit",
            key: "credit",
        },
    ];

    return (
        <div>
            <h2>Danh Sách Môn Học</h2>
            <Button type="primary" onClick={showModal}>
                Thêm Môn Học
            </Button>
            <Modal
                title="Chi tiết Môn Học"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <h3>Tên Môn Học</h3>
                    <Input
                        placeholder="Nhập Tên Môn Học"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <h3>Số Tín Chỉ</h3>
                    <InputNumber min={1} max={15} value={credit} onChange={onChange} />
                </Form>
            </Modal>
            <Table dataSource={addSub} columns={columns} rowKey="subjectId" />
        </div>
    );
};

export default index;
