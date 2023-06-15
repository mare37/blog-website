CREATE DATABASE IF NOT EXISTS websitedata;

USE websitedata;



DROP TABLE IF EXISTS contactinfo;

DROP TABLE IF EXISTS photoandresume;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS projects;


CREATE TABLE contactinfo (
    contactinfo_id int NOT NULL AUTO_INCREMENT,
    fullname       varchar(450) NOT NULL,
    email           varchar(450) NOT NULL,
    phonenumber     varchar(450) NOT NULL,
    message         varchar(5000) NOT NULL,
    status         varchar(450) NOT NULL,
    date            varchar(450) NOT NULL,
    time           varchar(450) NOT NULL,
    PRIMARY KEY (contactinfo_id)
);


CREATE TABLE photoandresume (
    id int NOT NULL AUTO_INCREMENT,
    item      VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE posts (
    posts_id int NOT NULL AUTO_INCREMENT,
    title       varchar(450) NOT NULL,
    blogposts           varchar(8000) NOT NULL,
    author     varchar(450) NOT NULL,
    date      varchar(500) NOT NULL,
    time           varchar(450) NOT NULL,
    PRIMARY KEY (posts_id)
);


CREATE TABLE projects (
    projects_id int NOT NULL AUTO_INCREMENT,
    nameOfProject varchar(450) NOT NULL,
    projectDescription varchar(450) NOT NULL,
    projectBackground text NOT NULL,
    theChallenge text NOT NULL,
    theSolution text NOT NULL,
    technologies varchar(450) NOT NULL,
    date varchar(450) NOT NULL,
    time varchar(450) NOT NULL,
    PRIMARY KEY (projects_id)
);



CREATE TABLE `technicalfeatures` (
  technicalfeatures_id int NOT NULL AUTO_INCREMENT,
  fk_projects_id int NOT NULL,
  technicalfeature varchar(1000) NOT NULL,
  PRIMARY KEY (technicalfeatures_id),
  KEY fk_projects_id_idx (fk_projects_id),
  CONSTRAINT fk_projects_id FOREIGN KEY (fk_projects_id) REFERENCES projects (projects_id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE users (
    users_id int NOT NULL AUTO_INCREMENT,
    email      varchar(450) NOT NULL,
    password         varchar(450) NOT NULL,
    PRIMARY KEY (users_id)
);



INSERT INTO projects (nameOfproject, projectDescription,projectBackground,theChallenge,theSolution, technologies, date,time)
VALUES ('Test Project', 'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ', ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit','Node, aws,php','2023-05-25', '12:00 PM');

INSERT INTO posts (title, blogposts, author,date,time)
VALUES ('Introduction To Machine Learning ', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ' ,'John Doe', '2023-05-25', '12:00 PM');


INSERT INTO users ( email, password)
VALUES ('test@email.com', '$2b$10$XtEVIue4tzDjEz3mLWq/GORReRanRzB1mTLUiuhMi2qt1RW9lgrYi');

