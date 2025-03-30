# Shortener-Url

This application is built using NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

## Tools Required

### Running with Docker

To run the application using Docker, you will need to have **Docker** or **Rancher** installed on your machine.

### Running Manually

If you prefer to run the application manually, you will need the following tools:

- **Node.js**
- **NestJS**
- **Docker** or **Rancher** to run the PostgreSQL database container.

## Installation

1. Clone the repository:

   - `https://github.com/Dener-Fernandes/shortener-url`.

### How to run with Docker

2. Add docker-compose.yml:

   - Create a `docker-compose.yml` file following the format of the `docker-compose.example.yml` file.

3. Run the application with Docker:

   - `docker-compose up`.

### How to run Manually

2. Install dependencies:

   - `npm install`.

3. Add environment variables:

   - Create a `.env` file following the format of the `.env.example` file. Add the information according to the variable names.

4. Add docker-compose.yml to run the database:

   - Create a `docker-compose.yml` file following the format of the `docker-compose.example.yml` file, but adding only the configuration for database.

5. Create a database:

   - `docker-compose up postgres`.

6. Run the application manually:

   - `npm run start:dev`.

### How to access Swagger

7. Access swagger documentation:

   - Use the url: `localhost:3000/shortener-url/api-docs`.
