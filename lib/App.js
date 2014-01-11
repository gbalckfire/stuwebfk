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

    var middleList = this._middleList=[];

    function handle(req,res)
    {
        if (0 !== middleList.length)
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