const Bootstrap = require("./navalia_bootstrap");

/**
 * Registra as rotas para o dashboard.
 * @param {*} app 
 * @param {Bootstrap} bootstrap 
 */
module.exports.register = (app, bootstrap) => {
    // A rota inicial. Apresenta uma descrição de como usar a dashboard.
    app.get("/manage/:guild/", (req, res) => {
        res.render("db_main", { layout: "dashboard" });
    });    
}