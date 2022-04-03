DROP DATABASE sql_social_media;
CREATE DATABASE sql_social_media;
USE sql_social_media;

CREATE TABLE user_profile(
        user_id INT NOT NULL AUTO_INCREMENT,
        firstname VARCHAR(40) NOT NULL,
        lastname VARCHAR(40) NOT NULL,
        username VARCHAR(40) NOT NULL,
        email VARCHAR(40) NOT NULL,
        password VARCHAR(40) NOT NULL,
        PRIMARY KEY ( user_id )
);

CREATE TABLE user_friendship(
	profile_request INT NOT NULL,
    profile_accept INT,
		CONSTRAINT profile_request FOREIGN KEY (profile_request)
		REFERENCES user_profile(user_id)
            ON DELETE CASCADE,       
		CONSTRAINT profile_accept FOREIGN KEY (profile_accept)
		REFERENCES user_profile(user_id)
			ON DELETE CASCADE
);

CREATE TABLE user_post(
        post_id INT NOT NULL AUTO_INCREMENT,
        fk_post_user_id INT NOT NULL,
        post_media_url TEXT(500),
        post_text TEXT(500) NOT NULL,
        date_of_creation DATETIME,
        PRIMARY KEY (post_id),
        CONSTRAINT fk_post_user_id FOREIGN KEY (fk_post_user_id)
        REFERENCES user_profile(user_id)
            ON DELETE CASCADE
);

CREATE TABLE post_comment(
       comment_id INT NOT NULL AUTO_INCREMENT,
       fk_comm_post_id INT NOT NULL,
       fk_comm_user_id INT NOT NULL,
       comment_text VARCHAR(500),
       comment_media_url VARCHAR(500),
       date_of_creation DATETIME,
       PRIMARY KEY (comment_id),
       CONSTRAINT fk_comm_post_id FOREIGN KEY (fk_comm_post_id)
       REFERENCES user_post(post_id)
            ON DELETE CASCADE,       
       CONSTRAINT fk_comm_user_id FOREIGN KEY (fk_comm_user_id)
       REFERENCES user_profile(user_id) 
            ON DELETE CASCADE
   );

CREATE TABLE post_like(
       post_like_id INT NOT NULL AUTO_INCREMENT,
       fk_post_like_post_id INT NOT NULL,
       fk_post_like_user_id INT NOT NULL,
       PRIMARY KEY (post_like_id),
       CONSTRAINT fk_post_like_post_id FOREIGN KEY (fk_post_like_post_id)
       REFERENCES user_post(post_id)
            ON DELETE CASCADE,
       
       CONSTRAINT fk_post_like_user_id FOREIGN KEY (fk_post_like_user_id)
       REFERENCES user_profile(user_id)
            ON DELETE CASCADE
);

CREATE TABLE comment_reply(
       reply_id INT NOT NULL AUTO_INCREMENT,
       fk_reply_comm_id INT NOT NULL,
       fk_reply_user_id INT NOT NULL,
       reply_text VARCHAR(500),
       reply_media_url VARCHAR(500),
       date_of_creation DATETIME,
       PRIMARY KEY (reply_id),
       CONSTRAINT fk_reply_comm_id FOREIGN KEY (fk_reply_comm_id)
       REFERENCES post_comment(comment_id)
            ON DELETE CASCADE,       
       CONSTRAINT fk_reply_user_id FOREIGN KEY (fk_reply_user_id)
       REFERENCES user_profile(user_id) 
            ON DELETE CASCADE
);

CREATE TABLE comment_like(
       comment_like_id INT NOT NULL AUTO_INCREMENT,
       fk_comm_like_post_id INT NOT NULL,
       fk_comm_like_user_id INT NOT NULL,
       PRIMARY KEY (comment_like_id),
       CONSTRAINT fk_comm_like_post_id FOREIGN KEY (fk_comm_like_post_id)
       REFERENCES user_post(post_id)
            ON DELETE CASCADE,
       
       CONSTRAINT fk_comm_like_user_id FOREIGN KEY (fk_comm_like_user_id)
       REFERENCES user_profile(user_id)
            ON DELETE CASCADE

);

CREATE TABLE comment_reply_like(
       comment_reply_like_id INT NOT NULL AUTO_INCREMENT,
       fk_reply_like_post_id INT NOT NULL,
       fk_reply_like_user_id INT NOT NULL,
       PRIMARY KEY (comment_reply_like_id),
       CONSTRAINT fk_reply_like_post_id FOREIGN KEY (fk_reply_like_post_id)
       REFERENCES user_post(post_id)
            ON DELETE CASCADE,
       
       CONSTRAINT fk_reply_like_user_id FOREIGN KEY (fk_reply_like_user_id)
       REFERENCES user_profile(user_id)
            ON DELETE CASCADE

);