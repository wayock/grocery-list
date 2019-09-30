const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const List = require("../../src/db/models").List;

describe("routes : groceries", () => {
  beforeEach(done => {
    this.list;
    this.grocery;
    sequelize.sync({ force: true }).then(res => {
      List.create({
        title: "Costco",
        description: "Great for bulk"
      })
        .then(list => {
          this.list = list;

          Grocery.create({
            item: "bread",
            note: "whatever is on sale",
            quantity: 1,
            purchased: false,
            userId: 1,
            listId: this.list.id
          }).then(grocery => {
            this.grocery = grocery;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /lists/:listId/groceries/new", () => {
    it("should render a new list form", done => {
      request.get(`${base}${this.list.id}/groceries/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Item");
        done();
      });
    });
  });

  describe("POST /lists/:listId/groceries/create", () => {
    it("should create a new grocery item and redirect", done => {
      const options = {
        url: `${base}${this.list.id}/groceries/create`,
        form: {
          item: "bananas",
          note: "organic",
          quantity: 10,
          purchased: false,
          userId: 1,
          listId: this.list.id
        }
      };
      request.post(options, (err, res, body) => {
        Grocery.findOne({ where: { item: "bananas" } })
          .then(grocery => {
            expect(grocery).not.toBeNull();
            expect(grocery.item).toBe("bananas");
            expect(grocery.note).toBe("organic");
            expect(grocery.quantity).toBe(10);
            expect(grocery.purchased).toBe(false);
            expect(grocery.listId).not.toBeNull();
            done();
          })
          .catch(err => {
            done();
          });
      });
    });
  });

  describe("GET /lists/:listId/groceries/:id", () => {
    it("should render a view with the selected grocery item", (done) => {
      request.get(`${base}${this.list.id}/groceries/${this.grocery.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("bread");
        done();
      });
    });
  });

  // describe("GET /groceries", () => {
  //   it("should return a status code 200 and all groceries", done => {
  //     request.get(base, (err, res, body) => {
  //       expect(res.statusCode).toBe(200);
  //       expect(err).toBeNull();
  //       expect(body).toContain("bread");
  //       expect(body).toContain("whatever is on sale");
  //       expect(body).toContain(1);
  //       done();
  //     });
  //   });
  // });
  //
  // describe("GET /groceries/new", () => {
  //   it("should render a new grocery item form", done => {
  //     request.get(`${base}new`, (err, res, body) => {
  //       expect(err).toBeNull();
  //       expect(body).toContain("New Item");
  //       done();
  //     });
  //   });
  // });
  //


  //
  // describe("POST /groceries/:id/destroy", () => {
  //   it("should delete the grocery item with the associated ID", (done) => {
  //     Grocery.findAll()
  //     .then((groceries) => {
  //       const groceryCountBeforeDelete = groceries.length;
  //       expect(groceryCountBeforeDelete).toBe(1);
  //       request.post(`${base}${this.grocery.id}/destroy`, (err, res, body) => {
  //         Grocery.findAll()
  //         .then((groceries) => {
  //           expect(err).toBeNull();
  //           expect(groceries.length).toBe(groceryCountBeforeDelete - 1);
  //           done();
  //         })
  //       });
  //     });
  //   });
  // });
  //
  // describe("GET /groceries/:id/edit", () => {
  //   it("should render a view with an edit grocery item form", (done) => {
  //     request.get(`${base}${this.grocery.id}/edit`, (err, res, body) => {
  //       expect(err).toBeNull();
  //       expect(body).toContain("Edit Item");
  //       expect(body).toContain("bread");
  //       done();
  //     });
  //   });
  // });
  //
  // describe("GET /groceries/:id/update", () => {
  //   it("should update the grocery item with the given values", (done) => {
  //     const options = {
  //       url: `${base}${this.grocery.id}/update`,
  //       form: {
  //         item: "Wheat Bread",
  //         note: "Dutch Farms Brand",
  //         quantity: 2,
  //         purchased: false,
  //         userId: 1
  //       }
  //     };
  //     request.post(options,
  //     (err, res, body) => {
  //       expect(err).toBeNull();
  //       Grocery.findOne({
  //         where: { id: this.grocery.id }
  //       })
  //       .then((grocery) => {
  //         expect(grocery.item).toBe("Wheat Bread");
  //         expect(grocery.quantity).toBe(2);
  //         expect(grocery.note).toBe("Dutch Farms Brand");
  //         done();
  //       });
  //     });
  //   });
  // });
});
