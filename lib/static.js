/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-10
 * Time: 下午11:12
 * To change this template use File | Settings | File Templates.
 */

var url = require("url");
var fs = require("fs");

function url2path(url_str)
{
    var urlObj = url.parse(url_str);
    var path = urlObj.path;

    return path;

}

module.exports = function static(parent_path)
{
    return function(responest,responest,next)
    {
        function callback(err,data)
        {
            if(err)
            {
                responest.statusCode = 404;
            }
            else
            {
                responest.write(data);
            }

            responest.end();
        }
        //同步读取方式
        var path = url2path(request.url);
        var data = fs.readFile(parent_path+path,callback);
    }

}

