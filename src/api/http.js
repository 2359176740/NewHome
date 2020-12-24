//导入
import axios from "axios";

//封装axios
axios.interceptors.response.use((ret) => {
  return ret.data || ret;
});

export default axios;