# UCLA-CS-130-Group4

### Backend Quickstart (from repo base directory)

- `npm install`
- `npm start`
- Open http://localhost:3001/ to see the app

Instruction for install Redis
$cd UCLA-CS-130-Group4
$npm install redis  //this command will install redis client for node js

Now Install redis server
For Mac:
    brew install redis

For others or if you do not have brew installed:
run these commands below. make sure you have GCC compiler and libc.
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make

Run redis server locally
Open a new terminal
run $redis-server

Test to see if you server working:
Open a new terminal and ping the server
$redis-cli ping
You should see 'PONG'

Look at the app.js (backend) to see how to connect to redis server from node js
