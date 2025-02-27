var auth = require("./api/auth");

var pages = ["account", "noauth", "writeups", "about", "updates", "feedback", "login", "logout", "passreset", "teamnamelookup", "contact", "learn", "faq", "teachers", "register", "sponsors", "scoreboard", "forgot", "irc"];
var auth_pages = ["problems", "exec", "compete", "shell"];

for(var i=0; i<auth_pages.length; i++) {
	pages.push(auth_pages[i]);
}

module.exports = function(app) {
	for(var i=0; i<pages.length; i++) {
		(function(i) {
			app.get("/" + pages[i], function(req, res) {
				// console.dir(auth.is_authorized(req));
				if (auth_pages.indexOf(pages[i]) > -1) {
					if (auth.is_authorized(req).success !== 1) {
						res.sendfile("pages/noauth.html", { root: __dirname });
						return;
					}
				}
				res.sendfile("pages" + req.url + ".html", { root: __dirname });
			});
		})(i);
	}

	app.get("/forgot/:code", function(req, res) {
		res.render("verify", {
			code: req.params.code
		});
	});
};