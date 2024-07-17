# Tuner App Back End
This is a back-end application for a simple [Music Playlist](https://github.com/manoelteixeira/tuner-app-fron-end) App.

## Instalation And Setup
1. **Fork** and **Clone** this repository
2. Create a **.env** with:
    - `PORT=<server port>`
    - `PG_HOST=<database url>`
    - `PG_PORT=<database port>`
    - `PG_DATABASE=<database name>`
    - `PG_USER=<database user>`

3. Install project dependencies with `npm install`

## Commands
- `npm run start`: to run the server
- `npm run watch`: to run the server using nodemon
- `npm run db:init`: to initialize the database
- `npm run db:seed`: to seed the database
- `npm run dev`: to initialize and seed the database before running the server


## Endpoints

|  #  |    URL     | HTTP Verb |    CRUD    |              Description               |
| :-: | :--------: | :-------: | :--------: | :------------------------------------: |
|  1  |   `/songs`   |    GET    |  **R**ead  |   Get a list (or index) of all songs   |
|  2  | `/songs/:id` |    GET    |  **R**ead  | Get an individual view (show one song) |
|  3  |   `/songs `  |   POST    | **C**reate |           Create a new song            |
|  4  | `/songs/:id` |  DELETE   | **D**elete |             Delete a song              |
|  5  | `/songs/:id` |    PUT    | **U**pdate |             Update a song              |