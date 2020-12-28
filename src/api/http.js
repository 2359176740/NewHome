//导入
import axios from "axios";

//封装axios
axios.interceptors.response.use((ret) => {
  // 这样请求只会给你返回后端的请请求数据，否则axios会返回很多自己本身封装的东西在里面
  return ret.data || ret;
});

export default axios;
