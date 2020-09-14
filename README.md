# Application for travel plans
## Toptal take-home test project

Requirements:

- User must be able to create an account and log in;
- When logged in, a user can add trips, and edit and delete their trips;
- Implement at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users;
- When a trip is entered, it has a Destination, StartDate, EndDate, and Comment;
- When displayed, each entry also has a day count to trip start (only for future trips);
- User can filter trips;
- Print travel plan for next month;
- REST API. Make it possible to perform all user actions via the API, including authentication;
- It must be a single-page application. All actions need to be done client-side using AJAX, refreshing the page is not acceptable;
- Functional UI/UX design is needed. You are not required to create a unique design, however, do follow best practices to make the project as functional as possible.

Project is organized into 2 directories - `api` and `ui`. Each contains a standalone project and can be built, tested and deployed independently.

API is implemented using [Lumen framework](https://lumen.laravel.com/), backed by [MySQL](https://www.mysql.com/)

UI is implemented using [Angular](https://angular.io/)

Additional details can be found in respective directories

For the time being, none of tech stack decisions are final
