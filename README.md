How to set up sample database:

Open SQL workbench and run initialize.sql.

How to set up the application:

Run "npm install --force" in food-tracker and food-tracker/server
Please be sure to add the --force for now as it's a temporary fix for dependancy issue

How to run the application:

Run the command "npm start" in food-tracker

How to generate the production dataset:
First the initialize.sql file will create the empty food ingredients table. Then on the backend of the application, we iterate through the json file of the production data set and fill this empty table with the desired columns we want. This is done once as soon as the application is loaded up, allowing the user to have access to the default list of food items.

Features implemented in this milestone:

Login/register/update account:
The feature implementation for this milestone consists of three main features. It consists of the login feature, ingredients feature (add / delete custom ingredients), meals feature (add / delete custom meals). Users can create their account, log in, and update their user settings accordingly. They can also delete their account as well and log out of their account too. Insert, update and delete queries are all utilized in this feature implementation.

Search / add / delete custom ingredients:
The next feature is the ability to search for ingredients in the database, as well as adding / deleting your own custom ingredients. Users can add an ingredient if they are unable to find it in the default database and input the macronutrients and calories manually. This food item will then get added to the ingredients database. The user that created this ingredient will be the only one able to see this ingredient under the “my ingredients tab”.

Search / add / delete custom meals:
The last feature in this milestone is the ability to add and delete custom meals. Users can do this through adding several ingredients to a cart (can be their own or from the default database), and then checking out and creating a meal. The users meals can then be seen in the “my meals” tab. The next milestone will include the tracking feature, where users can track ingredients and meals they have eaten. It will also include the progress view and the daily food diary.

Future implementation:
Currently there is a home page with a dummy food diary that does not work (it is just a dummy graph). The date picker is also functional in terms of picking a date, however the ability to see the food diary for the particular day and tracked foods for a particular day will be implemented in the future.
