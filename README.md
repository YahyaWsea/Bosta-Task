<h1  align="center"> Bosta URL monitoring server </h1>

## Table of Contents

- [Introduction](#introduction)

- [Tech Stack and Plugins](#tech-stack)

- [Requirements](#requirements)

- [Get-Started](#get-started)

## Introduction

This project is a submission for a task sent by [atp Vital](https://atpvital.com/) as a requirement process of FullStack developer.

As a real-time drag & drop board game the following instructions:


- Each team will view all team members movements.
- Player1 , Player2 will view their movements and actions only and so will Player3, Player4.
- The history of players movements is required to be kept when refreshing any page the last state of the board.

#### Drag & Drop Explanation

We should be able to drag either container of coins when dragging the container all coins value will be attached to it,
but when we start to drag coin value its value should be 1 and leave other values in the same position (container)


## Tech Stack

- [Reactjs](https://reactjs.org/).
- [Nodejs](https://nodejs.org/) combined with [Expressjs](https://expressjs.com) as minimal web framework.
- Database Used is [MongoDB](https://www.mongodb.com/) combined with [Mongoose](https://mongoosejs.com/) as ODM.

#### Plugins
-  [Socket.io](https://socket.io/docs/v4/) for real-time communication.
-  [React DnD](https://react-dnd.github.io/react-dnd/about) Drag and Drop for React

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

  - Backed Server will run by default on port `3333`, and is accessible from `http://localhost:3333`
  - Frontend will run by default on port `3000`, and is accessible from `http://localhost:3000`
  - Database will be accessible from `http://localhost:27018`

