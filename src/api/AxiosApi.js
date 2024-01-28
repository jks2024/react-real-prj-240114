import axios from "axios";
const EZEN_DOMAIN = "http://localhost:8111";

const AxiosApi = {
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
};

export default AxiosApi;
