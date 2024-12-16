# Rail Track API
> Description
This API allows you to manage train services, including creating, updating, and viewing services. It includes authentication and authorization features using JWT tokens and an API key for super-admin access.

## Prerequisites
>Node.js
>
>Express.js
>
>Sequelize (for database management)
>
>JWT (JSON Web Token)
>

## Setup
Clone the repository:

Install dependencies:

`npm install`

Setup environment variables: Create a .env file in the root directory with the following values:

APP_PORT=
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=
TOKEN_SECRET_KEY=your-secret-key
SUPER_ADMIN_API_KEY=your-super-admin-api-key

Run database migrations: Make sure your database is set up correctly.

Start the server:

`node app.js`

Your API will be accessible at http://localhost:5000

![Screenshot 2024-12-06 190116](https://github.com/user-attachments/assets/539ee9e9-1ec1-40f1-ade6-b891fcbe8939)

![Screenshot 2024-12-06 190143](https://github.com/user-attachments/assets/1bb2d9f6-c2e8-4a4e-96e8-596e7f2a4219)

![Screenshot 2024-12-06 190327](https://github.com/user-attachments/assets/d314d4d2-9fa9-4df2-9a0d-badef5b8dba0)

![Screenshot 2024-12-06 190341](https://github.com/user-attachments/assets/921643b3-4fa5-493b-8bb8-1077d255a916)




