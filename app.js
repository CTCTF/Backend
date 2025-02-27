var express = require("express");
var stylus = require("stylus");
var http = require("http");

var app = express();

app.configure(function() {
	app.set("port", process.env.PORT || 3000);

    app.set("views", __dirname + "/app/server/views");
    app.set("view engine", "jade");
    app.locals.pretty = true;

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: "lol-so-secret",
	}));
    app.use(express.methodOverride());

	// app.enable("strict routing");
	app.use(express.static(__dirname + "/web"));
});

require("./api/api")(app);
require("./app/server/hack-site")(app);
require("./router")(app);

http.createServer(app).listen(app.get("port"), function() {
	console.log("[app.js] listening...");
});