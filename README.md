# Flaunt-It

Welcome to Flaunt-It, the social media app that lets you connect with others, express yourself, and showcase your unique personality. Flaunt-It offers an easy and user-friendly interface that allows you to log in as an already existing user, view already existing posts, and create your own posts with just a few clicks. Whether you want to share your latest adventures or view what others are up to, Flaunt-It has got you covered. Flaunt-It is the perfect place to showcase your talents, creativity, and individuality to the world. So, what are you waiting for? Join our community today and start Flaunt-ing It!

### Instillation instructions:

    Dependencies:
    - Node.js
    - Postgres

    Installing Node.js:
    - If you don't have Node.js installed on your machine, download it from the official website: https://nodejs.org/
    - Follow the installation instructions for your operating system.

    Installing Postgres:
    - Download and install PostgreSQL from the official website: https://www.postgresql.org/download/
    - Follow the installation instructions for your operating system.

    Clone the repository:
    - Once Node.js and Postgres is installed this repository needs to be cloned.
    - Open your terminal and navigate to the directory where you want to clone the repository.
    - Use the following command to clone the repository:
        git clone https://github.com/yourusername/Flaunt-It.git

    Set up the database:
    - Once the above instructions are complete, create a new database named "flaunt" using the following instructions:
        - Using the cd command on Git Bash, navigate to the root directory of the repository stored on your local system
        - Once in the route directory enter the following command:
            psql -U postgres -f server/db/Create-db.sql
            (you will need to enter your postgres password)
        - Now the database is set up!

    Install pg dependency:
    - After the database is set up, navigate to the root directory of the cloned repository in your terminal.
    - Use the following command to install the pg dependency:
        npm install pg

    Start the application:
    - Once the installation is complete, use the following command to start the application:
        npm start
    - This will start the server and the application will be accessible at http://localhost:1337

That's it! You have successfully installed and set up Flaunt-It on your machine.


### Development notes: 
    Working features:
    - User can log in as an existing user
    - Sign up page checks for valid email and verifys the user fufilled all the password requirements
    - User is able to view already existing posts
    - User is able to make their own post
    - User data is stored in the database
    - Post data is stored in the database

    What needs improvement:
    - Sometimes posts do not go through
    - After posting it sends the user to “http://localhost:1337/home?” which the post feature does not work on, not sure why this happens
    - User should be able to upload an image to their post (as of now they can choose an image from their file but it will not upload to the server)
    - The feed box should change increase in height as more posts are uploaded to server

    Future plans:
    - Allow users to actually sign up and log in to their own account
    - Allow multiple users to access the page at a time
    - Give each user their own feed catered to their likes
    - Allow users to like and comment on other posts

