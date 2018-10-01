const express = require("express");
const express_handlebars = require("express-handlebars");
const config = require("./config.json");
const Bootstrap = require("./navalia_bootstrap");
const dashboard_routes = require("./dashboard_routes");

const app = express();
const bootstrap = new Bootstrap(config.navalia_bootstrap);

// Usar Handlebars para arquivos .html
app.engine("html", express_handlebars({ defaultLayout: "main", extname: "html" }));
app.set("view engine", "html");

// entregar arquivos estáticos que estão no diretório "static"
// em /static/*.*
app.use("/static/", express.static("./static/"));

// Mostrar página inicial
app.get("/", async (req, res) => {
    const guild_count = await bootstrap.countValues("guilds.size");
    const commands_count = await bootstrap.countValues("Navalia.commands.notaliases.length");

    res.render("root", { guild_count, commands_count, layout: "main" });
});

app.get("/commands/", async (req, res) => {
    const cmds = (await bootstrap.broadcastEvalNotNull("this.Navalia.getCommandsAsArray()"))[0];
    const cmdsJSONString = JSON.stringify(cmds);

    res.render("commands", { cmds, cmdsJSONString, layout: "main" });
});

dashboard_routes.register(app, bootstrap);
bootstrap.spawn();

app.listen(process.env.PORT || 3000);