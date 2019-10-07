const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;
const Authorizer = require("../../src/policies/groceries");

//   npm test spec/integration/groceries_spec.js

describe("routes : groceries", () => {
  beforeEach(done => {
    this.list;
    this.grocery;
    this.user;
    sequelize.sync({ force: true }).then(res => {
      User.create({
       name: "john",
       email: "starman@tesla.com",
       password: "Trekkie4lyfe",
       role: "member"
     })
     .then((user) => {
       this.user = user;
          List.create({
            title: "Groceries",
            description: "Family List",
            private: false,
          //  userId: this.user.id,
            groceries: [{
              item: "bread",
              note: "whatever is on sale",
              quantity: 1,
              purchased: false,
              userId: this.user.id,
            //  listId: this.list.id
            }]
        }, {
          include: {
            model: Grocery,
            as: "groceries"
          }
        })
        .then(list => {
            this.list = list;
            this.grocery = list.groceries[0];
            done();
          });
      })
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });


  describe("member user performing CRUD actions for List", () => {

    beforeEach((done) => {  // before each suite in member context
      User.create({
        name: "Johnny B",
        email: "johnnyBgood@music.com",
        password: "chuckberry",
        role: "member"
      })
      .then((user) => {
        this.user = user;
        request.get(
          {
            url: "http://localhost:3000/auth/fake",
            form: {
              role: user.role,
              userId: user.id,
              email: user.email
            }
          },
          (err, res, body) => {
            done();
          }
        );
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
      it("should create a new grocery item with listId, userId and redirect", done => {
        const options = {
          url: `${base}${this.list.id}/groceries/create`,
          form: {
            item: "bananas",
            note: "organic",
            quantity: 10,
            purchased: false,
            listId: this.list.id,
            userId: this.user.id
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
              expect(grocery.userId).toBe(this.user.id);
              done();
            })
            .catch(err => {
              done();
            });
        });
      });
      it("should not create a new grocery item that fails validations", (done) => {
         const options = {
           url: `${base}${this.list.id}/groceries/create`,
           form: {

  //#1
             item: "",
             body: "b"
           }
         };

         request.post(options,
           (err, res, body) => {

  //#2
             Grocery.findOne({where: {item: ""}})
             .then((grocery) => {
                 expect(grocery).toBeNull();
                 done();
             })
             .catch((err) => {
               console.log(err);
               done();
             });
           }
         );
       });
    });

    describe("GET /lists/:listId/groceries/:id", () => {
      it("should render a view with the selected grocery item", done => {
        request.get(
          `${base}${this.list.id}/groceries/${this.grocery.id}`,
          (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("bread");
            done();
          }
        );
      });
    });

    describe("POST /lists/:listId/groceries/:id/destroy", () => {
      it("should delete the grocery item with the associated ID", done => {
        //#1
        expect(this.grocery.id).toBe(1);

        request.post(
          `${base}${this.list.id}/groceries/${this.grocery.id}/destroy`,
          (err, res, body) => {
            //#2
            Grocery.findByPk(1).then(grocery => {
              expect(err).toBeNull();
              expect(grocery).toBeNull();
              done();
            });
          }
        );
      });
    });

    describe("GET /lists/:listId/groceries/:id/edit", () => {
      it("should render a view with an edit grocery item form", done => {
        request.get(
          `${base}${this.list.id}/groceries/${this.grocery.id}/edit`,
          (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Item");
            expect(body).toContain("bread");
            expect(body).toContain("whatever is on sale");
            expect(body).toContain(1);
            done();
          }
        );
      });
    });

    describe("POST /lists/:listId/groceries/:id/update", () => {
      it("should return a status code 302", done => {
        request.post(
          {
            url: `${base}${this.list.id}/groceries/${this.grocery.id}/update`,
            form: {
              item: "Wheat Bread",
              note: "Dutch Farms Brand",
              quantity: 2,
              purchased: false,
              listId: this.list.id
            }
          },
          (err, res, body) => {
            expect(res.statusCode).toBe(302);
            done();
          }
        );
      });

      it("should update the grocery item with the given values", done => {
        const options = {
          url: `${base}${this.list.id}/groceries/${this.grocery.id}/update`,
          form: {
            item: "Wheat Bread",
            note: "Dutch Farms Brand",
            quantity: 2,
            purchased: false,
            listId: this.list.id
          }
        };
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();

          Grocery.findOne({
            where: { id: this.grocery.id }
          }).then(grocery => {
            expect(grocery.item).toBe("Wheat Bread");
            expect(grocery.note).toBe("Dutch Farms Brand");
            expect(grocery.quantity).toBe(2);
            expect(grocery.purchased).toBe(false);
            done();
          });
        });
      });
    });
  });
});
