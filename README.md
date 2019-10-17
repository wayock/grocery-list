
# The Grocery List 

https://wayock-grocery-list.herokuapp.com

----
### Need a Better List?

- Do you need a better way to keep track of grocery items?  

- Do you often go grocery shopping for multiple people?  

- Wish you could share your grocery list with others in real time to have a better, more efficient shopping experience?

You’re in luck! The Grocery List web application is just what you need to keep track of your groceries.

----
### How The Grocery List Works

The Grocery List is a web application utitlizing Node.js, Express, EJS, PostgresSQL, Sequelize, Javascript, CSS, Bootstrap, and HTML to create and share grocery lists.  TTD is done with Jasmine to ensure the proper functioning of the application.

To use The Grocery List, users must create a free account to view and create lists.  Once the user is authenicated through passport, the user is then authorized to create, read, update, and view lists.  The user can also create, read, update and delete grocery items on those lists.  The list show view page displays the grocery items that have been added to that list.  Items can be checked off once users obtain those items.  When finished shopping the user can click "Delete Checked Items" to remove all purchased items from the list.  The list is updated in real time by fetching the list data api from the PostgresSQL database every three seconds.  Doing this ensures that the list is up to date if multiple people are simultaneously using the same list to shop.  Shopping for a surprise?  Need to create a private list?  The Grocery List allows users to create both private and public lists.  

----
### Future Improvements

If given more time, two things I would change about the application are:
1. Use socket.io to update the app in real time instead of using the `setInterval()` function to update the api data.
2. Allow users to share private lists with a select group of collaborators.
