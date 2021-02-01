const http = require("http");
var url = require("url");
var fs = require("fs");

http
	.createServer(function (req, res) {
		let q = url.parse(req.url, true);
		if (q.pathname == "/") {
			q.pathname = "/index.html";
		}
		const filename = "." + q.pathname;
		fs.readFile(filename, function (err, data) {
			if (err) {
				res.writeHead(404, { "Content-Type": "text/html" });
				const errorPage = fs.readFileSync("./404.html", "utf8");
				res.write(errorPage);
				return res.end();
			}
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(data);
			return res.end();
		});
	})
	.listen(8080);
