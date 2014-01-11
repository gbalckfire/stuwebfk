/**
 * Created with JetBrains WebStorm.
 * User: sskywing
 * Date: 14-1-11
 * Time: 下午6:54
 * To change this template use File | Settings | File Templates.
 */
var App = require("../../").App;
var app = new App();
var middle01 = require("./middle01");
var middle02 = require("./middle02");

app.use(middle01);
app.use(middle02);

app.listen(process.env.PORT|3000);

