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
  // 회원 가입
};

export default AxiosApi;
