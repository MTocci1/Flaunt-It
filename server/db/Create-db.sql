DROP DATABASE flaunt;
CREATE DATABASE flaunt;
CREATE USER flaunt WITH ENCRYPTED PASSWORD 'flaunt';
GRANT ALL PRIVILEGES ON DATABASE flaunt TO flaunt;
GRANT CONNECT ON DATABASE flaunt TO flaunt;

\c flaunt postgres

GRANT ALL ON SCHEMA public TO flaunt;

CREATE TABLE IF NOT EXISTS users (
    userID INTEGER,
    firstName VARCHAR,
    lastName VARCHAR,
    email VARCHAR,
    username VARCHAR,
    profilePic VARCHAR,
    user_password VARCHAR,
    emailValidated BOOLEAN
);

GRANT ALL PRIVILEGES ON TABLE users TO flaunt;


CREATE TABLE IF NOT EXISTS posts (
    postID INTEGER,
    username VARCHAR,
    profilePic VARCHAR,
    post_text VARCHAR,
    post_image VARCHAR,
    likes INTEGER,
    comments INTEGER
);

GRANT ALL PRIVILEGES ON TABLE posts TO flaunt;

--store some users
INSERT INTO users (userID, firstName, lastName, email, username, profilePic, user_password, emailValidated)
VALUES (0, 'Mason', 'Tocci', 'toasty@gmail.com', 'toaster', 'toaster.jpg', 'password1', true);

INSERT INTO users (userID, firstName, lastName, email, username, profilePic, user_password, emailValidated)
VALUES (1, 'John', 'Doe', 'doe@gmail.com', 'doeman', 'default.jpg', 'password2', true);

INSERT INTO users (userID, firstName, lastName, email, username, profilePic, user_password, emailValidated)
VALUES (2, 'Steve', 'Williams', 'swilly@gmail.com', 'swilly', 'swilly.png', 'password3', true);

INSERT INTO users (userID, firstName, lastName, email, username, profilePic, user_password, emailValidated)
VALUES (3, 'andrew', 'frosk', 'mildwater@gmail.com', 'frosker', 'default.jpg', 'password4', true);

--store some posts
INSERT INTO posts (postID, username, profilePic, post_text, post_image, likes, comments)
VALUES (0, 'pyroburd', 'fire.png', 'This movie is so good', 'movie.png', 33, 2);

INSERT INTO posts (postID, username, profilePic, post_text, post_image, likes, comments)
VALUES (1, 'patarboss', 'boss.jpg', 'This song is my jam', 'song.png', 12, 1);

INSERT INTO posts (postID, username, profilePic, post_text, post_image, likes, comments)
VALUES (2, 'kaz', 'king.png', 'I hate having to get up at 8am for school', 'null', 101, 5);

INSERT INTO posts (postID, username, profilePic, post_text, post_image, likes, comments)
VALUES (3, 'mildwater', 'water.png', 'square pizza > triangle pizza', 'pizza.jpg', 54, 12);

SELECT * FROM users;
SELECT * FROM posts;


