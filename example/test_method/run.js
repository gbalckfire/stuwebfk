/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-13
 * Time: 下午10:08
 * To change this template use File | Settings | File Templates.
 */

var fk = require("../..");
var App = fk.App;
var app = new App();
var static_middle = fk.static;

app.use(static_middle(__dirname+"/public"));

app.get(function(req,res)
{
    res.write("I'm GET method result");
    res.end();
});

app.post(function(req,res){
    res.write("I'm POST method result");
    res.end();
});

app.listen(process.env.PORT|3000);
