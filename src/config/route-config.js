module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const groceryRoutes = require("../routes/groceries")

    app.use(staticRoutes);
    app.use(groceryRoutes);
  }
}
