/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-14
 * Time: 下午6:04
 * To change this template use File | Settings | File Templates.
 */

var App = require("../..").App;
var app = new App;

app.get("/about",function(req,res)
{
    res.write("my name is leo");
    res.end();
}) ;

app.get("/contact/*/:id/ok",function(req,res)
{
    res.write("contact me use QQ 66666");
    res.end();
})   ;

app.listen(3000);
