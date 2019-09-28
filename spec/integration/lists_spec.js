const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {
  beforeEach(done => {
    this.list;
    sequelize.sync({ force: true }).then(res => {
      List.create({
        title: "Groceries",
        description: "Family List",
        private: false,
        userId: 1
      })
        .then(list => {
          this.list = list;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
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

     it("should render a new list form", (done) => {
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
       private: true,
       userId: 1
     }
   };
   it("should create a new list and redirect", (done) => {

     request.post(options,

       (err, res, body) => {
         List.findOne({where: {title: "Birthday Party Shopping"}})
         .then((list) => {
           expect(res.statusCode).toBe(303);
           expect(list.title).toBe("Birthday Party Shopping");
           expect(list.description).toBe("Max's Birthday on October 31");
           expect(list.private).toBe(true);
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

     it("should render a view with the selected list", (done) => {
       request.get(`${base}${this.list.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Groceries");
         expect(body).toContain("Family List");
         done();
       });
     });
   });

   describe("POST /lists/:id/destroy", () => {
       it("should delete the list with the associated ID", (done) => {

         List.findAll()
         .then((lists) => {

           const listCountBeforeDelete = lists.length;

           expect(listCountBeforeDelete).toBe(1);

           request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
             List.findAll()
             .then((lists) => {
               expect(err).toBeNull();
               expect(lists.length).toBe(listCountBeforeDelete - 1);
               done();
             })
           });
         });
       });
     });

});
