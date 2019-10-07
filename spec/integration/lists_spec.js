const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;

function authorizeUser(role, done) {
      User.create({
        name: "Johnny B",
        email: "johnnyBgood@music.com",
        password: "chuckberry",
        role: role
      })
      .then((user) => {
        request.get({         // mock authentication
          url: "http://localhost:3000/auth/fake",
          form: {
            role: user.role,     // mock authenticate as `role` user
            userId: user.id,
            email: user.email
          }
      },
      (err, res, body) => {
        done();
      }
    );
  });
}
describe("routes : lists", () => {
  beforeEach((done) => { // before each context
    this.list;   // define variables and bind to context
    sequelize.sync({ force: true }).then(() => {  // clear database
      List.create({
        title: "Groceries",
        description: "Family List",
        private: false,
        userId: this.user.id,
      })
        .then(res => {
          this.list = res;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});

describe("member user performing CRUD actions for List", () => {

  beforeEach((done) => {  // before each suite in member context
        authorizeUser("member", done);
  });


  describe("GET /lists", () => {
    it("should return a status code 200 and all lists", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Groceries");
        expect(body).toContain("Family List");
        done();
      });
    });
  });

  describe("GET /lists/new", () => {
    it("should render a new list form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New List");
        done();
      });
    });
  });

  describe("POST /lists/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Birthday Party Shopping",
        description: "Max's Birthday on October 31",
        private: true
      }
    };
    it("should create a new list and redirect", done => {
      request.post(
        options,

        (err, res, body) => {
          List.findOne({ where: { title: "Birthday Party Shopping" } })
            .then(list => {
              expect(res.statusCode).toBe(303);
              expect(list.title).toBe("Birthday Party Shopping");
              expect(list.description).toBe("Max's Birthday on October 31");
              expect(list.private).toBe(true);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
    it("should not create a new list that fails validations", (done) => {
       const options = {
         url: `${base}${this.list.id}/create`,
         form: {

//#1
           title: "",
           description: "greats sales"
         }
       };

       request.post(options,
         (err, res, body) => {

//#2
           List.findOne({where: {title: ""}})
           .then((list) => {
               expect(list).toBeNull();
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

  describe("GET /lists/:id", () => {
    it("should render a view with the selected list", done => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Groceries");
        expect(body).toContain("Family List");
        done();
      });
    });
  });

  describe("POST /lists/:id/destroy", () => {
    it("should delete the list with the associated ID", done => {
      List.findAll().then(lists => {
        const listCountBeforeDelete = lists.length;

        expect(listCountBeforeDelete).toBe(1);

        request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
          List.findAll().then(lists => {
            expect(err).toBeNull();
            expect(lists.length).toBe(listCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /lists/:id/edit", () => {
    it("should render a view with an edit list form", done => {
      request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit List");
        expect(body).toContain("Groceries");
        done();
      });
    });
  });

  describe("POST /lists/:id/update", () => {
    it("should update the list with the given values", done => {
      const options = {
        url: `${base}${this.list.id}/update`,
        form: {
          title: "Christmas Shopping",
          description: "Tis the season"
        }
      };
      //#1
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        //#2
        List.findOne({
          where: { id: this.list.id }
        }).then(list => {
          expect(list.title).toBe("Christmas Shopping");
          done();
        });
      });
    });
  });
});
