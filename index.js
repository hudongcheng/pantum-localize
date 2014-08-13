
var render = require('./lib/render');
var route = require('koa-route');
var koa = require('koa');
var app = koa();


app.use(route.get('/', list));
app.use(route.get('/string', list));
///TODO: Before function need to be implement.
//app.use(route.get('/string/import', import_strings));
//app.use(route.get('/string/export', export_strings));
//app.use(route.get('/string/add', add_string));
//app.use(route.get('/string/show/:id', show));
//app.use(route.get('/string/edit/:id', edit));
//app.use(route.get('/string/delete/:id', export_strings));

var posts = [];

/**
 * List all strings.
 */
function *list() {
	//this.body = 'list strings';
	this.body = yield render('list', { posts: posts });
}

app.listen(3000);
