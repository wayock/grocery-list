const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/groceries/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;

describe("routes: groceries", () => {
  beforeEach(done => {
    this.grocery;
    sequelize.sync({ force: true }).then(res => {
      Grocery.create({
        item: "bread",
        note: "whatever is on sale",
        quantity: 1,
        purchased: false,
        userId: 1
      })
        .then(grocery => {
          this.grocery = grocery;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("GET /groceries", () => {
    it("should return a status code 200 and all groceries", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("bread");
        expect(body).toContain("whatever is on sale");
        expect(body).toContain(1);
        done();
      });
    });
  });

  describe("GET /groceries/new", () => {
    it("should render a new grocery item form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Item");
        done();
      });
    });
  });

  describe("POST /groceries/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        item: "Ice Cream",
        note: "Chocolate Peanut Butter",
        quantity: 2,
        purchased: false,
        userId: 1
      }
    };

    it("should create a new item and redirect", done => {
      request.post(
        options,

        (err, res, body) => {
          Grocery.findOne({ where: { item: "Ice Cream" } })
            .then(grocery => {
              expect(res.statusCode).toBe(303);
              expect(grocery.item).toBe("Ice Cream");
              expect(grocery.note).toBe("Chocolate Peanut Butter");
              expect(grocery.quantity).toBe(2);
              expect(grocery.purchased).toBe(false);
              expect(grocery.userId).toBe(1);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

  describe("GET /groceries/:id", () => {
    it("should render a view with the selected grocery item", (done) => {
      request.get(`${base}${this.grocery.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("bread");
        done();
      });
    });
  });

  describe("POST /groceries/:id/destroy", () => {
    it("should delete the grocery item with the associated ID", (done) => {
      Grocery.findAll()
      .then((groceries) => {
        const groceryCountBeforeDelete = groceries.length;
        expect(groceryCountBeforeDelete).toBe(1);
        request.post(`${base}${this.grocery.id}/destroy`, (err, res, body) => {
          Grocery.findAll()
          .then((groceries) => {
            expect(err).toBeNull();
            expect(groceries.length).toBe(groceryCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });

});
