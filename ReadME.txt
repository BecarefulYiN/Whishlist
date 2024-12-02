1.Create Database

In this project I'm using the postgresSQL database 
So need to install the pgAdmin or postgresSQL CLI

after install pgAdmin you can create the database with the name that you want 
After creating, in this project folder having the file call "DbScript.txt"
in this have the script for createing the requied table. Right Click to the created DB and open "PSQL TOOL"   
run the script  in "PSQL TOOL" 
-------------------------------------------------------------------------------------------------------------

2..env configration 

in the folder WhishList Create the .env file with the following 

have the database configration

DB_NAME=<your database name> (eg. WhishList)
DB_USER_NAME=<your database host name>       (default. localhost)    
DB_PORT=<your database port>     (default:5432 )  
DB_USER=postgres 
DB_PASSWORD=<Your database server Password> 
------------------------------------------------------------------------------------------------------------
3.Starting the project 

now you can build this project with 
npm run build

After Build successfully You can run it 
npm start 

------------------------------------------------------------------------------------------------------------

Conclusion of this project

in this project using the  JWT Authentication technology, best handle from frontend for user exprience 
