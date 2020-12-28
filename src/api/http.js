//导入
import axios from "axios";


//封装axios
axios.interceptors.response.use((ret) => {
  // 这样请求只会给你返回后端的请请求数据，否则axios会返回很多自己本身封装的东西在里面
  return ret.data || ret;
});
axios.interceptors.request.use((config) => {
  // 获取jwt
  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    // 追加请求头信息
    config.headers = {
      Authorization: jwt,
    };
  }
  // 返回配置
  return config;
});


export default axios;
