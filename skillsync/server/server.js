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
  },
  Mutation: {
    // User Service (USV) Resolvers
    register: registerResolver,
    // updateUserProfile: updateUserProfileResolver,
  }
};

// User Service (USV) Resolvers
async function registerResolver(_, args) 
{
  try {
    const { name, password } = args;
    console.log(name, password);
    // Check if the user with the provided name already exists
    const existingUser = await db.collection('users').findOne({ name });
    
    if (existingUser) {
      throw new Error('User with this username already exists.');
    }

    // Create a new user document
    const newUser = {
      name,
      password,
      id: await db.collection('users').countDocuments() + 1,
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

async function updateUserProfileResolver(_, args) {
  try {
    const { email, profile } = args;
    console.log(" email detected is "+ email +" profile is " + profile.age);
    
    const existingUser = await db.collection('users').findOne({ email });

    if (!existingUser) {
      throw new Error('User with this email does not exist.');
    }

    existingUser.profile = profile;

    await db.collection('users').updateOne({ email }, { $set: existingUser });

    return existingUser;
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
}

async function deregisterUserResolver(_, args) {
  try {
    const { email } = args;

    const existingUser = await db.collection('users').findOne({ email });

    if (!existingUser) {
      throw new Error('User with this email does not exist.');
    }

    await db.collection('users').deleteOne({ email });

    return true;
  } catch (error) {
    throw new Error(`Error deregistering user: ${error.message}`);
  }
}

async function addQuestionResolver(_, args) {
  try {
    const { title,
      description,
      complexity,
      email} = args;

    const questionExists = await db.collection('questions').findOne({ title });
   
    if (questionExists) {
      throw new Error('Question with this title already exists.');
    }

    let maxId = await db.collection('questions').countDocuments() + 1;
    let idExists = await db.collection('questions').findOne({ id:Number(maxId) });

    while(idExists) {
      maxId = maxId + 1;
      idExists = await db.collection('questions').findOne({ id:Number(maxId) });
    }
    const newQuestion = {
      id: maxId,
      title,
      description,
      complexity,
      email, // Use the user's email
    };
    const result = await db.collection('questions').insertOne(newQuestion);

    const insertedQ = result.ops[0];
    console.log(insertedQ);
    return insertedQ;
  } catch (error) {
    throw new Error(`Error adding a new question: ${error.message}`);
  }
}

async function getAllQuestionsResolver() {
  try {
    const questions = await db.collection('questions').find().toArray();
    console.log("data get success!");
    return questions;
  } catch (error) {
    throw new Error(`Error fetching questions: ${error.message}`);
  }
}

async function deleteQuestionResolver(_, args) {
  try {
    const { id } = args;

    console.log("id detected is : "+ id);

    const existingQuestion = await db.collection('questions').findOne({ id:Number(id) });

    if (!existingQuestion) {
      throw new Error('Question with this id does not exist.');
    }
    await db.collection('questions').deleteOne({ id:Number(id) });
    return id;
  } catch (error) {
    throw new Error(`Error deleting question: ${error.message}`);
  }
}

async function updateQuestionResolver(_, args) {
  try {
    const { id, title, description, complexity } = args;
    
    const existingQuestion = await db.collection('questions').findOne({ id:Number(id) });

    if (!existingQuestion) {
      throw new Error('Question with this id does not exist.');
    }
    existingQuestion.title = title;
    existingQuestion.description = description;
    existingQuestion.complexity = complexity;

    await db.collection('questions').updateOne({ id:Number(id) }, { $set: existingQuestion });

    return existingQuestion;
  } catch (error) {
    throw new Error(`Error updating question details: ${error.message}`);
  }
}



/******************************************* 
SERVER INITIALIZATION CODE
********************************************/
const app = express();

//Attaching a Static web server.
app.use(express.static('public')); 

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