<?php
// 导入需要用到的函数库
include "./common.php";

// https://jia.baidu.com/decoration/home?jzts=1608788904492_0.5124814116297463&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5
// https://jia.baidu.com/decoration/mixrec?uuid=1780891290575ab3b783a6aa4dc463f887ed319b33&referer=home%3F&referlid=1780891290d31d969981cff196dc5d4b7098f9a461&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&selectArea=131&cbdid=OTVDREYwMkVDRTgzNjRGQ0I5NTk1MDFGN0I3MkVEMUE&jpath=home4&pn=10&rn=10&searchParam=case_pn%3A22%2Cpicture_pn%3A1%2Cwalkthrough_pn%3A1%2Cvideo_pn%3A1%2CxrResource_pn%3A1%2Crecommendation_pn%3A1&isHome=1&jzts=1608789075108_0.6427567858893686&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5

// 获取代理的参数信息
$params = "";
if(count($_REQUEST) > 0){
    foreach ($_REQUEST as $key => $value) {
        $params .= $key . "=" . $value . "&";
    }
    // 去除右边多余的&符号
    $params = "?" . rtrim($params,'&');
}

// 代理地址（各位只需要修改$url这个变量的值，将其替换成自己需要从别处去取的地址即可）
// 参数需要另传给当前这个php文件，由php代为传递给目标url
$url = "https://jia.baidu.com/decoration/home";
$api = $url . $params;

// 请求接口的数据
// http_get方法为get请求方法，如果需要发送post请求，请使用http_post请求方法
$data = http_get($api);

// 以json格式输出
header("Content-Type:application/json;charset=utf-8");
// cors解决跨域
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:*');
echo $data;