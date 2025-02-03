# Travel Tracker - Visited Countries Map

## Project Overview

**Travel Tracker** is a web application that allows multiple users to keep track of the countries they have visited and visualize them on an interactive world map. Each user has their own travel history, and the system provides an intuitive way for users to mark their travels, manage their records, and analyze their travel history. The application supports user management, allowing users to add their own countries to a database, and highlights the visited countries on a dynamic map.

## Features

- Users can add countries they've visited, and each user has their own list of visited countries.
- A world map displays countries that have been added by the user, with visited countries highlighted.
- The application supports multiple users, each with their own travel history.
- Users can create a new user from the homepage and start tracking their travel history.
- Uses PostgreSQL to store country data and user information.
- Dynamic interaction with the map via SVG elements.
- Error handling to prevent users from adding non-existent or duplicate countries.
- The number of visited countries is displayed for each user.

## Technologies Used

- **Backend** : Node.js, express.js
- **Database** : PostgreSQL
- **Frontend** : EJS, CSS, HTML
- **Styling** : Custom CSS(responsive layout)
- **Map** : SVG (Scalable Vector Graphics)
- **Other** : Body-Parser (for form data), pg (PostgreSQL client)

## Prerequisites

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [npm](https://www.npmjs.com)

## Setup Instructions

### 1. Clone the repository 

```
git clone https://github.com/yourusername/travel-tracker.git
cd travel-tracker
```

###  2. Install dependencies

Run the following command to install the necessary dependencies:

```
npm install
```

### 3. Set up environment variables 

Create a .env file in the root of the project and add your PostgreSQL credentials:

```
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=travel_tracker
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### 4. Set up the PostgreSQL database

Create a PostgreSQL database and the necessary tables by running the following SQL scripts:

```
-- Create the countries table
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  country_name VARCHAR(255) NOT NULL
);


-- Insert countries data (from countries.csv)
COPY countries(country_code, country_name) FROM 'path_to_countries.csv' DELIMITER ',' CSV HEADER;


-- Create the users and visited_countries and table

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
user_id INTEGER REFERENCES users(id)
);


-- Insert user data

INSERT INTO users(name, color)
VALUES('yourName', 'yourColor');
```

### 5. Run the application

Now, you can start the application:

``` 
npm start
```

The application should now be running on http://localhost:3000.

## How It Works

- **Home Page** : The home page shows a world map (SVG) with countries that the selected user has visited, highlighted in selected user color. The user can choose a different user from the list or create a new one. The map is created using an embedded SVG.

- **Adding Country** : The user can add a country by entering its name in the input field and submitting the form. The application checks if the country exists in the database and if it has already been visited by the selected user.

- **User Selection** : At the home page, users can either select from existing users or create a new one. When a new user is added, they provide a name and a color. The new user will then be able to track countries they have visited.

- **Error Handling** :  If a user tries to add a country that does not exist or has already been visited, an error message will be displayed on the page.

- **Total Counts** : The number of countries visited by the selected user is displayed at the bottom of the page.

## Acknowledgments

- The world map is created using SVG paths. Each country has an associated country_code used for identification and highlighting on the map.

- The data for countries is imported from a CSV file (countries.csv) containing country names and corresponding country codes. This data is used to populate the countries table in the PostgreSQL database.

- The application utilizes PostgreSQL for storing user and country visit data, with a users table for managing user information and a visited_countries table for tracking which countries each user has visited.

- The user interface is built using EJS and CSS, providing a responsive design for a smooth user experience.

