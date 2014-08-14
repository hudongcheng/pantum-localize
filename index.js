
var render = require('./lib/render');
var serve = require('koa-static');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

app.use(serve(__dirname + '/public'));

app.use(route.get('/', list));
app.use(route.get('/string', list));
///TODO: Before function need to be implement.
//app.use(route.get('/string/import', import_strings));
//app.use(route.get('/string/export', export_strings));
app.use(route.get('/string/new', add));
app.use(route.post('/string', create));
//app.use(route.get('/string/show/:id', show));
//app.use(route.get('/string/edit/:id', edit));
//app.use(route.get('/string/delete/:id', export_strings));

var posts = [];

//var languages = {zh:'中文', en:'英文', ar:'阿拉伯语', sv:'瑞士语', fr:'法语',
//								 it:'意大利语', ja:'日语', ru:'俄语', no:'挪威语', es:'西班牙语'};

//TODO: list.html的table header需要显示语言，
// posts和language顺序保存一致
// 是否可以做到灵活的顺序
var languages = [{code:'zh', name:'中文'},
	{code:'en', name:'英文'},
	{code:'ar', name:'阿拉伯语'},
	{code:'sv', name:'瑞士语'},
	{code:'fr', name:'法语'},
	{code:'it', name:'意大利语'},
	{code:'ja', name:'日语'},
	{code:'ru', name:'俄语'},
	{code:'no', name:'挪威语'},
	{code:'es', name:'西班牙语'}];

posts.push({zh:'zh', en:'en', ar:'ar', sv:'sv', fr:'fr', it:'it', ja:'ja', ru:'ru', no:'no', es:'es'});

/**
 * List all strings.
 */

function *list() {
	//this.body = 'list strings';
	this.body = yield render('list', { languages:languages, posts: posts });
}


/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new', { languages: languages});
}


/**
 * Add one string.
 */

function *create() {
var post = yield parse(this);
  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');
}

app.listen(3000);
