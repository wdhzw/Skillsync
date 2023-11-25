// initmongo.js

//To execute:
//$systemctl start mongod
//$mongo assignment3db initmongo.js 
//Above command to be executed from the directory where initmongo.js is present

//Perform a cleanup of existing data. 
db.dropDatabase()

// Create a collection for User Service (USV)
db.createCollection("users")
// Optionally, you can define indexes or validations for the "users" collection here

// Insert a sample user with an "id" field
db.users.insert({
  id: 1, // Unique ID for the user
  username: "John Doe",
  email: "johndoe@example.com",
  password: "123",
  gender: "male",
  suc_match: 0,
  invite_sent: [],
  invite_rec: [],
  rating: 0,
  review: [],
  profile: {
    age: 30,
    location: "New York",
    userskill: [],
    wantedskill: []
  },
  chats:[]
})

db.createCollection("skills")

db.skills.insert({
  id: 1, 
  name: "Basketball",
  description: "This is a sample skill.",
  proficiency: 0,
  certificate: "",
  pic: ""
})