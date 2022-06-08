USE sql_social_media;

DROP TABLE user_image;

CREATE TABLE user_image(
	image_id INT NOT NULL AUTO_INCREMENT,
    fk_image_user_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,	
    image_type VARCHAR(20) NOT NULL,   -- Image type will contain data where to show image, like profile, cover, gallery that will be named by user...
    image_description VARCHAR(500),
    date_of_creation DATETIME,
        PRIMARY KEY (image_id),
        CONSTRAINT fk_image_user_id FOREIGN KEY (fk_image_user_id)
        REFERENCES user_profile(user_id)
            ON DELETE CASCADE
);