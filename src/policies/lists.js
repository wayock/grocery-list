const ApplicationPolicy = require("./application");

module.exports = class ListPolicy extends ApplicationPolicy {

 // #2
  show() {
    return this.user != null;
  }

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
