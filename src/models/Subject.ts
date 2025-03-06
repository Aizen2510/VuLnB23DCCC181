import { useState } from 'react';

// Định nghĩa đối tượng của môn học
interface Sub {
  id: string;
  name: string;
  timedate: string | null;
  time: string | null;
  content: string | null;
  notes?: string | null;
}

export default () => {
  // State dùng để lưu danh sách các môn học (subs) và môn học hiện tại đang chỉnh sửa (currentSubs)
  const [subs, setSubs] = useState<Sub[]>([]);
  const [currentSubs, setCurrentSubs] = useState<Sub | null>(null);

  // Hàm lấy danh sách môn học từ localStorage
  const getSubsList = () => {
    const subsString = localStorage.getItem('subs');
    const subsObj: Sub[] = JSON.parse(subsString || '[]');
    setSubs(subsObj);
  };

  // Hàm đồng bộ dữ liệu từ state subs vào localStorage
  const syncToLocal = (handler: (subs: Sub[]) => Sub[]) => {
    const subsString = localStorage.getItem('subs');
    const subsObj: Sub[] = JSON.parse(subsString || '[]');
    const newSubsObj = handler(subsObj);
    localStorage.setItem('subs', JSON.stringify(newSubsObj));
  };

  // Hàm thêm một môn học mới vào danh sách subs
  const addSub = (name: string) => {
    const sub: Sub = {
      id: new Date().toISOString(),
      name,
      timedate: null,
      time: null,
      content: null,
      notes: null,
    };
    setSubs((prev) => [...prev, sub]);
    syncToLocal((subsObj) => [...subsObj, sub]);
  };

  // Hàm cập nhật trạng thái môn học
  const updateSubStatus = (id: string, done: boolean) => {
    const handler = (subsObj: Sub[]) =>
      subsObj.map((sub) => (sub.id === id ? { ...sub, done } : sub));
    setSubs(handler);
    syncToLocal(handler);
  };

  // Hàm tìm kiếm và cập nhật currentSubs để hiển thị môn học đó
  const startEdit = (id: string) => {
    const findedSub = subs.find((sub) => sub.id === id);
    if (findedSub) setCurrentSubs(findedSub);
  };

  // Hàm chỉnh sửa tên môn học
  const editSub = (name: string) => {
    setCurrentSubs((prev) => (prev ? { ...prev, name } : null));
  };

  // Hoàn tất chỉnh sửa môn học
  const finishEdit = () => {
    const handler = (subsObj: Sub[]) =>
      subsObj.map((sub) => (sub.id === currentSubs?.id ? (currentSubs as Sub) : sub));
    setSubs(handler);
    setCurrentSubs(null);
    syncToLocal(handler);
  };

  // Hàm xóa môn học
  const deleteSub = (id: string) => {
    if (currentSubs?.id === id) setCurrentSubs(null);
    const handler = (subsObj: Sub[]) => subsObj.filter((sub) => sub.id !== id);
    setSubs(handler);
    syncToLocal(handler);
  };

  return {
    subs,
    currentSubs,
    getSubsList,
    addSub,
    updateSubStatus,
    startEdit,
    editSub,
    finishEdit,
    deleteSub,
  };
};
