const ApplicationPolicy = require("./application");

module.exports = class ListPolicy extends ApplicationPolicy {

 // #2

  index(){
    return this.user != null
  }

  show() {
    return this.user != null && (this._isOwner() || !this.record.private);
  }

  showPrivate() {
    return this._isOwner();
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
