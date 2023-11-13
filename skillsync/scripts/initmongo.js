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
  profile: UserProfile,
  suc_match: 0,
  invite_sent: [],
  invite_rec: [],
  rating: 0,
  review: Review,
  profile: {
    age: 30,
    location: "New York",
    userskill: [],
    wantedskill: []
  }
})

// Create a collection for Question Service (QSV)
db.createCollection("questions")
// Optionally, you can define indexes or validations for the "questions" collection here

// Insert a sample question with an "id" field
db.questions.insert({
  id: 1, // Unique ID for the question
  title: "Sample Question",
  description: "This is a sample interview question.",
  complexity: "simple",
  email: "abc@gmail.com",
  // postedBy: "John Doe",
  // tags: ["interview", "sample"],
})