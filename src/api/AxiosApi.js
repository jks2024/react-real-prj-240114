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
};

export default AxiosApi;
