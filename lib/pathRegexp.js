/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-19
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
module.exports = pathRegexp;



function pathRegexp(path){
    var paramNames = [];
    path = path.replace(/\?(.*)$/,"")
        .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"(.*)")
        .replace(/((:(.*(?=\/)))|(:(.*(?=$))))/g,function(){

            // arguments的第一个和最后两个参数，并不是我们想要的$1 ... $n的匹配值，
            // 所以 len 是匹配的数量
            var len = arguments.length - 3;
            for(var i=0;i<len;i++){
                var avg = arguments[i+1];

                // 由于正则嵌套分组，所以要判断匹配字符串是否有 " : " 前缀，
                // 目的是得到 :name的name部分和 :age 的 age部分。
                if(typeof avg === "string" && avg[0] !== ":"){
                    paramNames.push(avg);
                }
            }
            return "(.*)"
        })
        .replace(/\//g,"\\\/")

    var regexp = new RegExp(path+"$");
    regexp.paramNames = paramNames;
    return regexp;
}