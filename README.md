
# The Grocery List 

https://wayock-grocery-list.herokuapp.com

----

Do you often go grocery shopping for multiple people?  
Do you need a better way to keep track of grocery items?  
Wish you could share you grocery list with others in real time to have a better, more efficient shopping experience?

You’re in luck! The Grocery List is just what you need to keep track of your groceries.

----

The Grocery List is a web application utitlizing Node.js, Express, Ejs, PostgresSQL, Sequelize, Javascript, CSS, Bootstrap, and HTML to create Grocery lists.  TTD is done with Jasmine to ensure the proper functioning of the application.

To use The Grocery List, users must create an account to view lists.  Once the user is authenicated through passport, the user is then authorized to create, read, update, and view lists.  The used can also create, read, update and delete grocery items on those lists.  The list show view page displays the grocery items that have been added to that list.  The list is updated in real time by fetching the data api from PostgresSQL every three seconds.  

----

If given more time, three things I would change about the application are:
1. Use socket.io to update the app in real time instead of using the setInterval timer to update the api data.
2. Allow users to create private lists.
3. Allow users to share private lists with a select group of collaborators.
