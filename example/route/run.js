/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-14
 * Time: 下午6:04
 * To change this template use File | Settings | File Templates.
 */

var App = require("../..").App;
var query = require("../../").query;
var app = new App;

//app.use(query);

app.get("/about/:name/:age",function(req,res)
{
    res.write("my name is"+req.params.name+"\n");
    res.write("my age is "+req.params.age+"\n");
    res.end();
}) ;


//app.get("/contact/*/:id/ok",function(req,res)
//{
//    res.write("contact me use QQ 66666");
//    res.end();
//})   ;


app.listen(3000);
