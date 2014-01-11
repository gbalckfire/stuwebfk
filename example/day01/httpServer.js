/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 13-12-30
 * Time: 下午5:13
 * To change this template use File | Settings | File Templates.
 */
var http = require("http");
var url = require("url");
var server = http.createServer();
var fs = require("fs");

server.on("request",handle);

function url2path(url_str)
{
    var urlObj = url.parse(url_str);
    var path = urlObj.path;

    return path;

}

function handle(request,responest)
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
    var data = fs.readFile(__dirname+"/public"+path,callback);

}

server.listen(3000);