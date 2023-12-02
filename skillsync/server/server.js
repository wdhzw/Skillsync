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
    // getUserProfile: getUserProfileResolver,

    getAllUsers: getAllUsersResolver,
    getAllSkills: getAllSkillsResolver,
    getSkill: getSkillResolver,
    usersBySkill: usersBySkillResolver,
    getChat: getChatResolver,
    getUserChats: getUserChatsResolver,
    getChatMessages: getChatMessagesResolver,
  },
  Mutation: {
    // User Service (USV) Resolvers
    register: registerResolver,
    login: loginResolver,
    editProfile: editProfileResolver,
    createChat: createChatResolver,
    sendMessage: sendMessageResolver,
    deleteMessage: deleteMessageResolver,
  }
};

// User Service (USV) Resolvers
async function registerResolver(_, { username, password, gender, profile }) {
  try {
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
      profile: {
        ...profile,
        skills: profile.skills.map(skill => ({
          skill_id: skill.skill_id,
          level: skill.level
        })),
        wanted_skills: profile.wanted_skills
      },
      suc_match: 0,
      invite_sent: [],
      invite_rec: [],
      rating: 0,
      review: [],
      chats: [],
    };

    const result = await db.collection('users').insertOne(newUser);

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
    const { username, newusername, password, gender, profile } = args;

    const existingUser = await db.collection('users').findOne({ username });
    if (!existingUser) {
      throw new Error('User with this username does not exist.');
    }

    if (newusername && newusername !== username) {
      const existUsername = await db.collection('users').findOne({ username: newusername });
      if (existUsername) {
        throw new Error('New username is used by others already.');
      } else {
        existingUser.username = newusername;
      }
    }

    if (password) existingUser.password = password;
    if (gender) existingUser.gender = gender;

    if (profile) {
      if (profile.age !== undefined) existingUser.profile.age = profile.age;
      if (profile.location !== undefined) existingUser.profile.location = profile.location;
      if (profile.avatar) {
        // Handle avatar logic
        // existingUser.profile.avatar = avatarPath;
      }
      if (profile.skills) {
        existingUser.profile.skills = profile.skills.map(skill => ({
          skill_id: skill.skill_id,
          level: skill.level
        }));
      }
      if (profile.wanted_skills) {
        existingUser.profile.wanted_skills = profile.wanted_skills;
      }
    }

    await db.collection('users').updateOne({ username }, { $set: existingUser });

    return existingUser;
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
}


async function getAllUsersResolver() {
  try {
    const users = await db.collection('users').find().toArray();
    console.log("data get success!");
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

async function getAllSkillsResolver() {
  return await db.collection('skills').find().toArray();
}

async function getSkillResolver(_, args) {
  const { id } = args;
  return await db.collection('skills').findOne({ id: parseInt(id, 10) });
}

async function usersBySkillResolver(_, args) {
  try {
    const { skillId } = args;
    const users = await db.collection('users').find({ "profile.skills.skill_id": skillId }).toArray();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users by skill: ${error.message}`);
  }
}

// Resolver to get a single chat by its ID
async function getChatResolver(_, args) {
  const { chatId } = args;
  return await db.collection('chats').findOne({ id: parseInt(chatId, 10) });
}

// Resolver to get all chats for a specific user
async function getUserChatsResolver(_, args) {
  const { userId } = args;
  
  // Convert userId to the appropriate type if necessary. 
  // Here, we're assuming it needs to be an integer.
  const userIdInt = parseInt(userId, 10);

  // Use the $elemMatch operator to check if any element in the 
  // participants array matches the given userId.
  return await db.collection('chats').find({ 
    "participants.id": userIdInt
  }).toArray();
}

// Resolver to get all messages in a specific chat
async function getChatMessagesResolver(_, args) {
  const { chatId } = args;
  const chat = await db.collection('chats').findOne({ id: parseInt(chatId, 10) });
  return chat ? chat.messages : [];async function getUserChatsResolver(_, args) {
    const { userId } = args;
    //return await db.collection('chats').find().toArray();
    return await db.collection('chats').find({ "participants.id": parseInt(userId,10)}).toArray();
  }
}
async function createChatResolver(_, args) {
  const { participants } = args;

  const newChat = {
    id: await db.collection('chats').countDocuments() + 1, // Generates a new ID
    participants: participants,
    messages: [] // Initially, the chat will have no messages
  };

  await db.collection('chats').insertOne(newChat);
  return newChat;
}


// Resolver to send a new message
async function sendMessageResolver(_, args) {
  const { chatId, content, senderId } = args;

  const newMessage = {
    id: new Date().getTime(), // Timestamp-based unique ID
    content: content,
    timestamp: new Date(),
    sender: senderId
  };

  await db.collection('chats').updateOne(
    { id: chatId },
    { $push: { messages: newMessage } }
  );

  return newMessage;
}



// Resolver to delete a message
async function deleteMessageResolver(_, args) {
  const { chatId, messageId } = args;

  await db.collection('chats').updateOne(
    { id: chatId },
    { $pull: { messages: { id: messageId } } } // Removes the message with the specified ID
  );

  return messageId; // Returns the ID of the deleted message
}

/******************************************* 
SERVER INITIALIZATION CODE
********************************************/
const app = express();

//Attaching a Static web server.
// app.use(express.static('build'));

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

//app.use('/avatars', express.static('uploads'));
 
//Starting the server that runs forever.
  (async function () {
    try {
      await connectToDb();
      app.listen(8000, function () {
        console.log('App started on port 8000');
      });
    } catch (err) {
      console.log('ERROR:', err);
    }
  })();


  
/******************************************* 
CONNECTION TO SSG
********************************************/

const axios = require('axios');

app.get('/api/skillsfuture', async (req, res) => {
  try {
    const id = 'da013a8a894d40048241933d3bcc0b8b';
    const secret = 'YjU4OGNiMTQtMWE2Ni00ZTUwLWE2ZGQtMzAxMjBiYTQxMzNm';
    const credentials = Buffer.from(`${id}:${secret}`).toString('base64');

    // Getting the token
    const tokenResponse = await axios.post('https://public-api.ssg-wsg.sg/dp-oauth/oauth/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const token = tokenResponse.data.access_token;

    // Making the actual request to the SkillsFuture API
    const response = await axios.get('https://public-api.ssg-wsg.sg/courses/directory', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageSize: 9,
        page: 0,
        keyword: req.query.keyword, 
      }
    });

    res.json(response.data);
    
    console.log("data request from ssg success");
    console.log(response.data);
  } catch (error) {
    console.log("data request error");
    console.error('Error in proxy endpoint', error);
    res.status(500).send('Error in proxy request');
  }
});

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Adjust the path according to your setup
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Append original file extension
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  if (req.file) {
    const avatarPath = `/uploads/${req.file.filename}`; // Adjust the path according to your setup
    res.json({ path: avatarPath });
  } else {
    res.status(400).send('No file uploaded.');
  }
});
