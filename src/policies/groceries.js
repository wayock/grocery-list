const ApplicationPolicy = require("./application");

module.exports = class GroceryPolicy extends ApplicationPolicy {

 // #2
  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

 // #3
  edit() {
    return this.user != null;
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
