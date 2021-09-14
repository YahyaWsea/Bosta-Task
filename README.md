<h1  align="center"> Bosta URL monitoring server </h1>

## Table of Contents

- [Introduction](#introduction)

- [Tech Stack](#tech-stack)

- [Database Models](#database-models)

- [Requirements](#requirements)

- [Get-Started](#get-started)

- [Additional Resources](#additional-resources)

## Introduction

This project is a submission for a task sent by [Bosta](https://bosta.co/) as a requirement process of Backend Engineer.

As an uptime monitoring RESTful API server, authorized users should enter URLs to be monitored, and get detailed uptime reports based on the following instructions:


- Sign-up with email verification.
- Stateless authentication using JWT.
- Users can create a check to monitor a given URL if it is up or down.
- Users can edit, pause, or delete their checks if needed.
- Users may receive a notification on a webhook URL by sending HTTP POST request whenever a check goes down or up.
- Users should receive email alerts whenever a check goes down or up.
- Users can get detailed uptime reports about their checks availability, average response time, and total uptime/downtime.
- Users can group their checks by tags and get reports by tag.





## Tech Stack

- [Nodejs](https://nodejs.org/) combined with [Expressjs](https://expressjs.com) as minimal web framework.
- Database Used is [MongoDB](https://www.mongodb.com/) combined with [Mongoose](https://mongoosejs.com/) as ODM.


## Database Models:
  - User model: Has user properties like name, email, password, status, code.
  - Check model: Has all check data provided by use with its related reports properties.


## Requirements

  ### Local

  - Nodejs v12.14.0
  - Npm v6.13.4

  ### Docker

  - Docker version 19.03.2
  - docker-compose version 1.21.0



## Get-Started

  Change directory to the project's root (where `docker-compose.yml` is ) and run the following command which will build the images if the images **do not exist** and starts the containers.

  ```bash
  $ docker-compose up
  ```

  - Server will run by default on port `3000`, and is accessible from `http://localhost:3000`
  - navigate to swagger from `http://localhost:3000/explorer`       **(Not Completed Unfortunately)**
  - Database will be accessible from `http://localhost:27018`

### Additional Resources

- [Postman Collection Link: Local or Docker](https://www.getpostman.com/collections/7f7183970966924c9c6a)
