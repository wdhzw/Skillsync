const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

/******************************************* 
DATABASE CONNECTION CODE
********************************************/
//Note that the below variable is a global variable 
//that is initialized in the connectToDb function and used elsewhere.
let db;

//Function to connect to the database
async function connectToDb() {
    const url = 'mongodb://localhost/skillsync';
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
  }

/******************************************* 
GraphQL CODE
********************************************/  
const resolvers = {
  Query: {
    // User Service (USV) Resolvers
    // getUserProfile: getUserProfileResolver,

    // getAllQuestions: getAllQuestionsResolver,
    getAllSkills: getAllSkillsResolver,
    getSkill: getSkillResolver,

  },
  Mutation: {
    // User Service (USV) Resolvers
    register: registerResolver,
    login: loginResolver,
    editProfile: editProfileResolver,
    // updateUserProfile: updateUserProfileResolver,
  }
};

// User Service (USV) Resolvers
async function registerResolver(_, args) 
{
  try {
    const { username, password, gender, profile } = args;
    console.log(username, password);
    // Check if the user with the provided name already exists
    const existingUser = await db.collection('users').findOne({ username });
    
    if (existingUser) {
      throw new Error('User with this username already exists.');
    }

    // Create a new user document
    const newUser = {
      username,
      password,
      gender,
      id: await db.collection('users').countDocuments() + 1,
      profile,
      suc_match: 0,
      invite_sent: [],
      invite_rec: [],
      rating: 0,
      review: [],
      chats:[],
    };

    // Insert the new user into the "users" collection
    const result = await db.collection('users').insertOne(newUser);

    // Get the inserted user document
    const insertedUser = result.ops[0];
    console.log(insertedUser);
    return insertedUser;
  } catch (error) {
    throw new Error(`Error signing up user: ${error.message}`);
  }
};


async function loginResolver(_, args) 
{
  try {
    const { username, password } = args;
    const existingUser = await db.collection('users').findOne({ username });
    
    if (!existingUser) {
      throw new Error('User with this username does not exists.');
    }
    if(password != existingUser.password) {
      existingUser = null;
      throw new Error('Wrong Password!');
    }
    console.log(existingUser);
    return existingUser;
  } catch (error) {
    throw new Error(`Error login user: ${error.message}`);
  }
};

async function editProfileResolver(_, args) {
  try {

    const { username,newusername, password, gender,profile } = args;
    
    const existingUser = await db.collection('users').findOne({ username });

    if (!existingUser) {
      throw new Error('User with this username does not exist.');
    }

    if(newusername!==username && newusername!=="") {
      const existUsername = await db.collection('users').findOne({ newusername });

      if (existUsername) {
        throw new Error('New username is used by others already.');
      } else {
        existingUser.username = newusername;
      }
  }
  if(password!==""){ existingUser.password = password; }
  if(gender!==""){ existingUser.gender = gender; }
  if(profile.age !=="") {
    existingUser.profile.age = profile.age;
  }
  if(profile.postcode !=="") {
    existingUser.profile.postcode = profile.postcode;
  }

    await db.collection('users').updateOne({ username }, { $set: existingUser });

    return existingUser;
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
}

async function getAllSkillsResolver() {
  return await db.collection('skills').find().toArray();
}

async function getSkillResolver(_, args) {
  const { id } = args;
  return await db.collection('skills').findOne({ id: parseInt(id, 10) });
}
//test
/******************************************* 
SERVER INITIALIZATION CODE
********************************************/
const app = express();

//Attaching a Static web server.
app.use(express.static('build'));

//Creating and attaching a GraphQL API server.
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});
server.applyMiddleware({ app, path: '/graphql' });
 
//Starting the server that runs forever.
  (async function () {
    try {
      await connectToDb();
      app.listen(3000, function () {
        console.log('App started on port 3000');
      });
    } catch (err) {
      console.log('ERROR:', err);
    }
  })();