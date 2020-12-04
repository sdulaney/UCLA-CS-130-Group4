# UCLA-CS-130-Group4 / "Chicken Tinder"

A more creative & efficient way to find restaurants when eating in groups.

### Project Directory Structure

```bash
.
├── app.js                      # Configure Express backend + routes to add seed data
├── bin
│   └── www                     # Script to start Express web server
├── classes
│   ├── classes.js              # Implementation of Users, Groups, and Restaurants classes
│   └── matcher.js              # Matching algorithm
├── client
│   ├── package.json            # Metadata/dependencies for frontend React app
│   ├── public
│   │   ├── favicon.ico         # Favicon for single page React app
│   │   ├── index.html          # HTML for single page React app
│   │   ├── logo192.png         # Logo for single page React app
│   │   ├── logo512.png         # Logo for single page React app
│   │   ├── manifest.json       # Metadata for single page React app
│   │   └── robots.txt          # robots.txt for single page React app
│   ├── README.md               # README for frontend client
│   ├── src
│   │   ├── App.js                  # Root App component for single page React app
│   │   ├── components
│   │   │   ├── Card.js             # Card component
│   │   │   ├── DropdownField.js    # DropdownField component
│   │   │   └── InputField.js       # InputField component
│   │   ├── config.js                   # Config for "State" dropdown field options
│   │   ├── containers
│   │   │   ├── CreateGroupPage.js      # CreateGroupPage container
│   │   │   ├── HomePage.js             # HomePage container
│   │   │   ├── JoinGroupPage.js        # JoinGroupPage container
│   │   │   └── SwipingPage.js          # SwipingPage container
│   │   ├── index.js                    # Script for React app entry point
│   │   ├── styles
│   │   │   ├── card.css                # CSS styles for Card
│   │   │   ├── homePage.css            # CSS styles for Home Page
│   │   │   ├── InputField.css          # CSS styles for Input Field
│   │   │   └── pageStyle.css           # CSS styles for All Pages
│   │   └── __test__
│   │       ├── CreateGroupPage.test.js     # Tests for CreateGroupPage (jest-dom)
│   │       ├── HomePage.test.js            # Tests for HomePage (jest-dom)
│   │       ├── JoinGroupPage.test.js       # Tests for JoinGroupPage (jest-dom)
│   │       └── SwipingPage.test.js         # Tests for SwipingPage (jest-dom)
│   └── yarn.lock
├── dump.rdb
├── package.json                            # Metadata/dependencies for backend Express app
├── README.md                               # README for root project directory
├── routes
│   ├── getMatch.js             # getMatch Express Router: Handles checking for match
│   ├── groups.js               # groups Express Router: Handles creating group, Yelp API query
│   ├── index.js                # index Express Router: Handles sending React app on index route
│   ├── swipe.js                # swipe Express Router: Handles swiping on a restaurant
│   └── users.js                # users Express Router: Handles adding user to a group
├── tests
│   ├── backend.test.js         # Tests for backend express app (jest/supertest)
│   └── sample.test.js
└── yelp.js                     # API Key for the Yelp Fusion Business Search API
```

### Backend Quickstart (from repo root directory)

- `npm install`
- `npm start`
- Open http://localhost:3001/

### Frontend Quickstart (from repo root directory)

- Open 1st terminal to start Redis server
  1. `$ redis-server`
  2. If redis port already occupied, `$ redis-cli shutdown` and retry step 1
- Open 2nd terminal to start Client
  1. `$ cd client`
  2. `$ npm install`
  3. `$ npm start`
  4. You should be automatically directed to http://localhost:8000

### Instructions to install Redis (from repo root directory)

- `$ npm install ioredis` //this command will install redis client for node.js
- Now to install Redis server
  - Mac: `$ brew install redis`
  - Others (make sure you have GCC compiler and libc):
    ```sh
    $ wget http://download.redis.io/redis-stable.tar.gz
    $ tar xvzf redis-stable.tar.gz
    $ cd redis-stable
    $ make
    ```
  - Test if Redis server is working
    - In a new terminal, `$ redis-cli ping`
    - You should see `PONG`

Look at the app.js (backend) to see how to connect to redis server from node.js

- For more info about setting up Redis: https://redis.io/topics/quickstart
- For more info about npm ioredis: https://www.npmjs.com/package/ioredis

## Testing (from root directory)

- Frontend

  - `$ cd client`
  - `$ npm install`
  - `$ npm run test`
  - Press `a` to run all tests

- Backend
  - `$ npm install`
  - `$ npm test`
