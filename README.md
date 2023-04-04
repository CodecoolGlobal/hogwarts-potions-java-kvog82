# Hogwarts Potions

This is a solo project from the last module of the Codecool curriculum (Advanced - Java Spring).

The application is about students and potions in Hogwarts. You can explore the different houses with their students.
Potions can be added and brewed and it is possible to make a discovery, if its recipe is not present in the database 
before. 

## Technologies used
* Frontend: React, JavaScript, CSS
* Backend: Java, Spring/Spring Boot/Spring Data JPA, PostgreSQL, H2 Database

## How to run this application

Open Terminal and clone the project
```ssh
git clone git@github.com:CodecoolGlobal/hogwarts-potions-java-kvog82.git
```

### Start backend
Go to the project directory:
```ssh
cd hogwarts-potions-java-kvog82/server
```

Start the application:
```ssh
mvn spring-boot:run 
```

### Start frontend
Go to the project directory:
```ssh
cd hogwarts-potions-java-kvog82/client
```

Start the application:
```terminal
$npm start
```

## Frontend

- Discover the features of the Application at `http://localhost:3000/`
- Features:
  - Create new potions
  - Start and/or continue brewing potions
  - Get help by finding potions with the same ingredients
  - Add a new potion
  - Filter potions by student
  - See the houses with their rooms and inhabitants
  - Show empty rooms
  - Find rooms for rat owners (where none of the students has a cat or owl as pet)
  - Create an empty room
  - Delete a room by number

## Backend
### Available Endpoints
#### Potions
- GET http://localhost:8080/potions - Get all potions
- GET http://localhost:8080/potions/4 - Get all potions for Student Harry Potter
- POST http://localhost:8080/potions/brew - Start a new (empty) potion
- POST http://localhost:8080/potions/24/add - Add ingredient to the newly created potion
- GET http://localhost:8080/potions/24/help - Get help (all recipes with the same ingredients)
- POST http://localhost:8080/potions - Add a new potion
  ```json
  {
    "brewingStudentId": 5,
    "ingredients": [
        {
            "id": 8,
            "name": "Unicorn hair"
        },
        {
            "id": 16,
            "name": "Frog brain"
        },
        {
            "id": 17,
            "name": "Beetle"
        },
        {
            "id": 25,
            "name": "Carrot"
        },
        {
            "id": 26,
            "name": "Apple"
        }
        ]
  }
  ```

#### Students
- GET http://localhost:8080/rooms - Get all rooms
- GET http://localhost:8080/rooms/available - Get available rooms
- GET http://localhost:8080/rooms/rat-owners - Get rooms for rat owners
- GET http://localhost:8080/rooms/2 - Get room by id
- POST http://localhost:8080/rooms - Create new room
```json
  {
	"id": 0,
	"number": 5,
	"house": "SLYTHERIN",
	"students": []
  }
```
- PUT http://localhost:8080/rooms/24 - Update room
```json
  {
    "number": 5,
    "house": "SLYTHERIN",
    "students": []
  }
```
- DELETE http://localhost:8080/rooms/24 - Delete room
