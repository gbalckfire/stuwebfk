/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-10
 * Time: 下午11:08
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");
var pathRegexp = require("./pathRegexp");
var url = require("url");

module.exports = App;

function App()
{
    var self = this;

    this._route_post_handles = [];
    this._route_get_handles = [];

    var middleList = this._middleList=[];

    function findHandle(requrl)
    {
        return url.parse(requrl).pathname;
    }

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

                    var path = url.parse(req.url).pathname;
                    function findHandle(route_handles){
                        for(var i = 0,len = route_handles.length;i<len;i++)
                        {
                            var route_handle = route_handles[i];
                            var pass = route_handle.route.test(path);
                            if(pass)
                            {
                                handle = route_handle.handle;
                                break;
                            }
                        }
                    }
                    switch(req.method)
                    {
                        case "GET":
                            //handle = self._route_get_handles[req.url];
                            findHandle(self._route_get_handles);
                            break;
                        case "POST":
                            //handle =  self._route_post_handles[req.url];
                            findHandle(self._route_post_handles) ;
                            break;
                    }

                    if(handle)
                    {
                        handle(req,res);
                    }
                    else
                    {
                        res.statusCode = 404;
                        res.end();
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
   //  this._route_get_handles[route] = handle1;
    this._route_get_handles.push({route:pathRegexp(route),handle:handle1});
}

App.prototype.post = function(route,handle2)
{
    //this._postHandle = handle2;
    //this._route_post_handles[route] = handle2;
    this._route_post_handles.push({route:pathRegexp(route),handle:handle2});
}


  /*
function App(){
    // 插件有序列表
    var middleList = this._middleList = [];

    var self = this;

    this._route_post_handles = [] //最新修改

    this._route_get_handles = [] //最新修改

    // request事件响应函数
    function handle(req,res){

        // 循环执行插件
        var middleIndex = 0; // 插件索引

        execMiddle();

        // 执行这个函数时，会自动执行下一个middle插件。
        // 至于这个函数的执行，是由插件所控制。
        function next(){
            middleIndex += 1;
            execMiddle();
        }

        // 执行插件函数
        function execMiddle(){
            var middle = middleList[middleIndex];
            if(middle){
                middle(req,res,next);
            }else{
                var handle;

                // 把 /abc?age=12 转为 /abc
                var path = url.parse(req.url).pathname;  //最新修改
                // 找到路由对应的路由处理器。

                function findHandle(route_handles){ //最新修改
                    for(var i=0,len=route_handles.length; i<len ; i++){
                        var route_handle = route_handles[i];
                        var pass = route_handle.route.test(path);
                        if(pass){
                            handle = route_handle.handle;
                            break;
                        }
                    }
                }

                // 判断是GET还是POST方法
                switch(req.method){
                    case "GET":
                        // handle = self._route_get_handles[req.url]
                        findHandle(self._route_get_handles); //最新修改
                        break;
                    case "POST":
                        // handle = self._route_post_handles[req.url]
                        findHandle(self._route_post_handles); //最新修改
                        break;
                }

                if(handle){
                    handle(req,res);
                }else{
                    // 没找到指定处理器，返回404
                    res.statusCode = 404; //最新修改
                    res.end(); //最新修改
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

App.prototype.get = function(route,handle){ //最新修改
    this._route_get_handles.push({route:pathRegexp(route),handle:handle})
}

App.prototype.post = function(route,handle){ //最新修改
    this._route_post_handles.push({route:pathRegexp(route),handle:handle})
}

// 监听端口
App.prototype.listen = function(){
    this._server.listen.apply(this._server,arguments);
}
      */