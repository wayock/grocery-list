const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/groceries/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const List = require("../../src/db/models").List;

describe("Grocery", () => {
  beforeEach(done => {
    this.list;
    this.grocery;
    sequelize.sync({ force: true }).then(res => {
      List.create({
        title: "Costco",
        description: "Great for bulk"
      })
      .then((list) => {
        this.list = list;

        Grocery.create({
          item: "bread",
          note: "whatever is on sale",
          quantity: 1,
          purchased: false,
          userId: 1,
          listId: this.list.id
        })
        .then((grocery) => {
          this.grocery = grocery;
          done();
        });
      })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  });

  describe("#create()", () => {

    it("should create a new item and assigned list", (done) => {
      Grocery.create({
        item: "bananas",
        note: "organic",
        quantity: 10,
        purchased: false,
        listId: this.list.id
      })
      .then((grocery) => {
        //  expect(res.statusCode).toBe(303);
          expect(grocery.item).toBe("bananas");
          expect(grocery.note).toBe("organic");
          expect(grocery.quantity).toBe(10);
          expect(grocery.purchased).toBe(false);
          //expect(grocery.listId).toBe(1);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
      });

    it("should not create a post with missing title, quantity, and assigned list", (done) => {
      Grocery.create({

        note: "organic"
      })
      .then((grocery) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Grocery.item cannot be null");
        expect(err.message).toContain("Grocery.quantity cannot be null");
        expect(err.message).toContain("Grocery.listId cannot be null");
        done();
      })
    });
  });

  describe("#setList()", () => {

     it("should associate a list and a grocery together", (done) => {

       List.create({
         title: "Giant",
         description: "Bonus Card Savings"
       })
       .then((newList) => {

         expect(this.grocery.listId).toBe(this.list.id);

         this.grocery.setList(newList)
         .then((grocery) => {

           expect(grocery.listId).toBe(newList.id);
           done();

         });
       })
     });

   });

   describe("#getList()", () => {

      it("should return the associated list", (done) => {

        this.grocery.getList()
        .then((associatedList) => {
          expect(associatedList.title).toBe("Costco");
          done();
        });

      });

    });

    describe("#setUser()", () => {

      it("should associate a grocery and a user together", (done) => {

        User.create({
          name: "joe",
          email: "ada@example.com",
          password: "password"
        })
        .then((newUser) => {

          expect(this.grocery.userId).toBe(this.user.id);

          this.grocery.setUser(newUser)
          .then((grocery) => {

            expect(this.grocery.userId).toBe(newUser.id);
            done();

          });
        })
      });

    });

    describe("#getUser()", () => {

      it("should return the associated list", (done) => {

        this.grocery.getUser()
        .then((associatedUser) => {
          expect(associatedUser.email).toBe("starman@tesla.com");
          done();
        });

      });

    });

});
