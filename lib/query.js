/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-26
 * Time: 下午4:10
 * To change this template use File | Settings | File Templates.
 */
var url = require("url");
var qs = require("querystring");

function query(req,res,next)
{
    var querystring = url.parse(req.url).query;
    if(querystring)
    {
        var queryObj = qs.parse(querystring);
        req.query = queryObj;
    }

    next();
}

module.exports = query;
