import AxiosApi from "../../api/AxiosApi";
import { useState, useEffect } from "react";
import CateTemplate from "./CateTemplate";
import CateList from "./CateList";
import CateInsert from "./CateInsert";
import Modal from "../../component/Modal";

const Category = () => {
  const [category, setCategory] = useState(""); // 카테고리 목록에 대한 상태 관리
  const email = localStorage.getItem("email");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); //삭제 대상 ID

  // 모달 내용을 변경
  const [modalContent, setModalContent] = useState(""); // children에 포함해야 할 내용
  // 모달 팝업 처리
  const [modalOpen, setModalOpen] = useState(false); // 초기값은 닫힌 상태
  const closeModal = () => {
    // 모달을 닫는 함수
    setModalOpen(false);
  };
  const confirmModal = async () => {
    console.log("모달의 확인 버튼 클릭");
    setModalOpen(false);
    if (selectedCategoryId !== null) {
      try {
        const rsp = await AxiosApi.cateDelete(selectedCategoryId);

        if (rsp.data) {
          const rsp = await AxiosApi.cateList();
          setCategory(rsp.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const cateList = async () => {
      try {
        const rsp = await AxiosApi.cateList(); // 전체 목록 가져오기
        setCategory(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    cateList();
  }, []);
  const onInsert = async (text) => {
    console.log("onInsert Function Call : ", text);
    try {
      const rsp = await AxiosApi.cateInsert(email, text);
      console.log(rsp.data);
      if (rsp.data) {
        const rsp = await AxiosApi.cateList();
        console.log(rsp.data);
        setCategory(rsp.data);
      } else {
        alert("카테고리 목록 등록 실패!!!!");
      }
    } catch (e) {
      alert("카테고리 목록 등록 실패(네트워크 에러)");
    }
  };

  const onRemove = async (id) => {
    setSelectedCategoryId(id); // 모달을 열 때 해당 카테고리의 ID 저장
    setModalOpen(true);
    setModalContent("카테고리 목록을 정말로 삭제하시겠습니까?");
  };

  return (
    <CateTemplate>
      <CateInsert onInsert={onInsert} />
      <CateList cates={category} onRemove={onRemove} />
      <Modal
        open={modalOpen}
        close={closeModal}
        confirm={confirmModal}
        type={true}
        header="오류"
      >
        {modalContent}
      </Modal>
    </CateTemplate>
  );
};

export default Category;
