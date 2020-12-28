//定义代名称
let prefix = '/v1/'

//请求封装
export default {
    //请求首页第一屏数据
    getAirPortInfo : prefix + 'guide.php',
    //请求其他数据
    getCaseList: prefix + 'getCaseList.php'
}