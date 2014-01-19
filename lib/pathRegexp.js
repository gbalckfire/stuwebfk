/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-19
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
module.exports = pathRegexp;

module.exports = pathRegexp;
function pathRegexp (path){
    var pathNames = [];
    path = path.replace(/\?(.*)$/,"")

        // 这一步是把所有 * 替换成正则表达式(.*)
        .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"(.*)")

        // 这一步是把所有 :xxx 替换成正则表达式(.*)
        .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g,"(.*)")

        // 这一步是把所有 / 路径变为匹配正则表达式的 \/ 的形式
        .replace(/\//g,"\\\/")
    var regexp = new RegExp("^"+path+"\\/?$");
    regexp.parameterNames = pathNames;

    //这一步，通过生成正则表达式  ，前后的 ^ 和 & 顾名思义，要严格匹配整个路径。
    return regexp;
}