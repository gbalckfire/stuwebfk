/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-10
 * Time: 下午11:08
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");

module.exports = App;

function App()
{
    var self = this;

    this._route_post_handles = {};
    this._route_get_handles = {};

    var middleList = this._middleList=[];

    function handle(req,res)
    {


            var middleIndex = 0;
            execMiddle();

            function next()
            {
                middleIndex += 1;
                execMiddle();
            }

            function execMiddle()
            {
                var middle = middleList[middleIndex];
                if (middle)
                {
                    middle(req, res, next);
                }
                else
                {
                    var handle ;
                    switch(req.method)
                    {
                        case "GET":
                            handle = self._route_get_handles[req.url];
                            break;
                        case "POST":
                            handle =  self._route_post_handles[req.url];
                            break;
                    }

                    if(handle)
                    {
                        handle(req,res);
                    }
                }
            }
    }

    this._server = http.createServer(handle);
}
// 加入功能栈
App.prototype.use = function(middle){
    this._middleList.push(middle);
}

// 监听端口
App.prototype.listen = function(){
    this._server.listen.apply(this._server,arguments);
}

App.prototype.get = function(route,handle1)
{
   // this._getHandle = handle1;
    this._route_get_handles[route] = handle1;
}

App.prototype.post = function(route,handle2)
{
    //this._postHandle = handle2;
    this._route_post_handles[route] = handle2;
}