# Travel Tracker - Visited Countries Map

## Project Overview

**Travel Tracker** is a web application that allows users to keep track of the countries they have visited and visualize them on an interactive world map. The system provides an intuitive way for users to mark their travels, manage their records, and analyze their travel history.

## Features

- Users can add countries they've visited.
- A world map displays countries that have been added, with visited countries highlighted.
- Uses PostgreSQL to store country data.
- Dynamic interaction with the map via SVG elements.

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

###  2. Install dependincies

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


-- Create the visited_countries table
CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  FOREIGN KEY (country_code) REFERENCES countries(country_code)
);
```

### 5. Run the application

Now, you can start the application:

``` 
npm start
```

The application should now be running on http://localhost:3000.

## How It Works

- **Home Page** : The home page shows a world map (SVG) with countries that the user has visited highlighted in teal. The map is created using an embedded SVG.

- **Adding Country** : The user can add a country by entering its name in the input field and submitting the form. The application checks if the country exists in the database and if it has already been visited.

- **Error Handling** : If a user tries to add a country that does not exist or has already been added, an error message will be displayed.

- **Total Counts** : The number of countries added is displayed at the bottom of the page.

## Acknowledgments

- The world map is created using SVG paths. Each country has an associated country_code used for identification and highlighting.

- The data for countries is imported from a CSV file (countries.csv) containing country names and corresponding codes.


