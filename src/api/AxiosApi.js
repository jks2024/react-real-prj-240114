import axios from "axios";
const EZEN_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  SOCKET_URL: "ws://localhost:8111/ws/chat",
  // 로그인
  memberLogin: async (email, pw) => {
    const login = {
      email: email,
      pwd: pw,
    };
    return await axios.post(EZEN_DOMAIN + "/auth/login", login);
  },
  // 회원 가입 여부 확인
  memberRegCheck: async (email) => {
    return await axios.get(EZEN_DOMAIN + `/auth/exists/${email}`);
  },
  // 회원 가입
  memberReg: async (email, pwd, name) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
    };
    return await axios.post(EZEN_DOMAIN + "/auth/signup", member);
  },
  membersGet: async () => {
    return await axios.get(EZEN_DOMAIN + "/users/list");
  },
  // 개별 회원 조회
  memberGetOne: async (email) => {
    return await axios.get(EZEN_DOMAIN + `/users/detail/${email}`);
  },
  // 회원 정보 수정
  menberUpdate: async (email, name, image) => {
    console.log("회원 정보 수정 : ", email, name, image);
    const member = {
      email: email,
      name: name,
      image: image,
    };
    return await axios.put(EZEN_DOMAIN + "/users/modify", member);
  },
  // 카테고리 조회
  cateList: async () => {
    return await axios.get(EZEN_DOMAIN + "/api/category/list");
  },
  // 카테고리 등록
  cateInsert: async (email, category) => {
    const cate = {
      email: email,
      categoryName: category,
    };
    return await axios.post(EZEN_DOMAIN + "/api/category/new", cate);
  },
  // 카테고리 삭제
  cateDelete: async (categoryId) => {
    return await axios.delete(
      EZEN_DOMAIN + `/api/category/delete/${categoryId}`
    );
  },
  // 게시글 목록 가져오기
  boardList: async () => {
    return await axios.get(EZEN_DOMAIN + "/api/board/list");
  },
  // 게시글 쓰기 email, title, selectedCategory, content, url
  boardWrite: async (email, title, selectedCategory, content, url) => {
    const board = {
      title: title,
      content: content,
      categoryId: selectedCategory,
      email: email,
      img: url,
    };
    return await axios.post(EZEN_DOMAIN + "/api/board/new", board);
  },
  // 게시글 상세 조회
  boardDetail: async (id) => {
    return await axios.get(EZEN_DOMAIN + `/api/board/detail/${id}`);
  },
  // 게시글 삭제
  boardDelete: async (id) => {
    return await axios.delete(EZEN_DOMAIN + `/api/board/delete/${id}`);
  },
  // 댓글 목록 조회
  commentList: async (id) => {
    return await axios.get(EZEN_DOMAIN + `/api/comment/list/${id}`);
  },
  // 댓글 쓰기 : email, id, inputComment
  commentWrite: async (email, id, input) => {
    const comment = {
      email: email,
      boardId: id,
      content: input,
    };
    return await axios.post(EZEN_DOMAIN + "/api/comment/new", comment);
  },
  // 채팅방 리스트 가져오기
  chatList: async () => {
    return await axios.get(EZEN_DOMAIN + "/chat/list");
  },
  // 채팅방 생성하기
  chatCreate: async (email, name) => {
    const chat = {
      email: email,
      name: name,
    };
    return await axios.post(EZEN_DOMAIN + "/chat/new", chat);
  },
  // 채팅방 정보 가져 오기
  chatDetail: async (roomId) => {
    return await axios.get(EZEN_DOMAIN + `/chat/room/${roomId}`);
  },
};

export default AxiosApi;
