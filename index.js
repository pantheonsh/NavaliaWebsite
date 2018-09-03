const express = require("express");
const express_handlebars = require("express-handlebars");
const app = express();

// Usar Handlebars para arquivos .html
app.engine("html", express_handlebars({ defaultLayout: "main", extname: "html" }));
app.set("view engine", "html");

// entregar arquivos estáticos que estão no diretório "static"
// em /static/*.*
app.use("/static/", express.static("./static/"));

// Mostrar página inicial
app.get("/", (req, res) => {
    res.render("root", { layout: "main" });
});

app.listen(process.env.PORT || 3000);