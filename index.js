
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
posts.push({zh:'zh', en:'en', ar:'ar', sv:'sv', fr:'fr', it:'it', ja:'ja', ru:'ru', no:'no', es:'es'});

/**
 * List all strings.
 */

function *list() {
	//this.body = 'list strings';
	this.body = yield render('list', { posts: posts });
}


/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
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
