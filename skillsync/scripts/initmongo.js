// initmongo.js

//To execute:
//$systemctl start mongod
//$mongo skillsync initmongo.js 
//Above command to be executed from the directory where initmongo.js is present

//Perform a cleanup of existing data. 
db.dropDatabase()

// Create a collection for User Service (USV)
db.createCollection("users")
// Optionally, you can define indexes or validations for the "users" collection here
// Create a collection for Chats
db.createCollection("chats")
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
    avatar:"/images/john.png",
    postal:339155,
    location: "Kallang",
    skills: [
      { skill_id: 1, level: "Beginner" },
      { skill_id: 2, level: "Advanced" }
    ],
    wanted_skills: [5] 
  },
  chats:[]
})

db.users.insertMany([
  {
    id: 2, // Unique ID for the user
    username: "Mary Tan",
    email: "marytan@example.com",
    password: "123",
    gender: "female",
    suc_match: 0,
    invite_sent: [],
    invite_rec: [],
    rating: 0,
    review: [],
    profile: {
      age: 40,
      postal:560101,
      location: "Ang Mo Kio",
      avatar:"/images/mary.png",
      skills: [
        { skill_id: 3, level: "Beginner" },
        { skill_id: 8, level: "Intermediate" },
        { skill_id: 5, level: "Advanced" }
      ],
      wanted_skills: [9,10] 
    },
    chats:[]
  },
  {
    id: 3, // Unique ID for the user
    username: "Jane Lin",
    email: "janelin@example.com",
    password: "123",
    gender: "female",
    suc_match: 0,
    invite_sent: [],
    invite_rec: [],
    rating: 0,
    review: [],
    profile: {
      age: 22,
      postal:540563,
      location: "Jurong",
      avatar:"/images/jane.png",
      skills: [
        { skill_id: 1, level: "Beginner" },
        { skill_id: 2, level: "Advanced" },
        { skill_id: 3, level: "Advanced" }

      ],
      wanted_skills: [4,5,6] 
    },
    chats:[]
  },
  {
    id: 4, // Unique ID for the user
    username: "Harry Lee",
    email: "harrylee@example.com",
    password: "123",
    gender: "male",
    suc_match: 0,
    invite_sent: [],
    invite_rec: [],
    rating: 0,
    review: [],
    profile: {
      age: 44,
      postal:238823,
      location: "Orchard",
      avatar:"/images/harry.png",
      skills: [
        { skill_id: 9, level: "Beginner" },
        { skill_id: 10, level: "Advanced" },
        { skill_id: 11, level: "Intermediate" }
      ],
      wanted_skills: [1,2,3] 
    },
    chats:[]
  },
  {
    id: 5, // Unique ID for the user
    username: "Richard Lee",
    email: "richardlee@example.com",
    password: "123",
    gender: "male",
    suc_match: 0,
    invite_sent: [],
    invite_rec: [],
    rating: 0,
    review: [],
    profile: {
      age: 77,
      postal:449269,
      location: "Marine Parade",
      avatar:"/images/richard.png",
      skills: [
        { skill_id: 7, level: "Beginner" },
        { skill_id: 8, level: "Beginner" },
        { skill_id: 9, level: "Advanced" }
      ],
      wanted_skills: [3,6,10] 
    },
    chats:[]
  },
  {
    id: 6, // Unique ID for the user
    username: "Minne Tan",
    email: "minnetan@example.com",
    password: "123",
    gender: "female",
    suc_match: 0,
    invite_sent: [],
    invite_rec: [],
    rating: 0,
    review: [],
    profile: {
      age: 18,
      postal:510258,
      location: "Pasir Ris",
      avatar:"/images/minnie.png",
      skills: [
        { skill_id: 1, level: "Intermediate" },
        { skill_id: 2, level: "Intermediate" },
        { skill_id: 3, level: "Advanced" }
      ],
      wanted_skills: [5,6,7] 
    },
    chats:[]
  },  
])


db.createCollection("skills")

db.skills.insertMany([
  { id: 1, name: "JavaScript", description: "JavaScript is a dynamic programming language commonly used for web development. It enables interactive web pages and is an essential part of web applications.", pic: "/images/skill-js.png" },
  { id: 2, name: "Python", description: "Python is a versatile language known for its ease of learning and readability. It's widely used in data science, machine learning, web development, and automation.", pic: "/images/skill-python.png" },
  { id: 3, name: "Data Analysis", description: "Data Analysis involves extracting insights from data. It's a critical skill in various fields, helping in making informed decisions based on data trends and patterns.", pic: "/images/skill-dataanalysis.png" },
  { id: 4, name: "Machine Learning", description: "Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience. It's used for predictions, classifications, and more.", pic: "/images/skill-machinelearning.png" },
  { id: 5, name: "React", description: "React is a popular JavaScript library for building user interfaces, particularly single-page applications. It's known for its efficiency and flexibility.", pic: "/images/skill-react.png" },
  { id: 6, name: "Node.js", description: "Node.js is an open-source, cross-platform JavaScript runtime environment. It allows for the development of server-side and networking applications.", pic: "/images/skill-node.png" },
  { id: 7, name: "Web Development", description: "Web Development is the building and maintenance of websites. It's the work behind the scenes to make a website look great, work fast and perform well.", pic: "/images/skill-webdevelopment.png" },
  { id: 8, name: "Graphic Design", description: "Graphic Design is the craft of creating visual content to communicate messages. Designers use typography, images, color, and layout to meet users' specific needs.", pic: "/images/skill-graphicdesign.png" },
  { id: 9, name: "Digital Marketing", description: "Digital Marketing encompasses all marketing efforts that use an electronic device or the internet. Businesses leverage digital channels to connect with current and prospective customers.", pic: "/images/skill-digitalmarketing.png" },
  { id: 10, name: "Cybersecurity", description: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information.", pic: "/images/skill-cybersecurity.png" },
  { id: 11, name: "Blockchain", description: "Blockchain technology offers a way for untrusted parties to reach agreement on a common digital history. It is the foundation for cryptocurrencies like Bitcoin.", pic: "/images/skill-blockchain.png" },
]);


// Create a collection for Chats
db.createCollection("chats")
const user1 = db.users.findOne({ id: 1 });
const user2 = db.users.findOne({ id: 2 });
db.chats.insertMany([
  {
    id: 1,
    participants: [user1, user2],
    messages: [
      {
        id: new Date('2023-01-01T10:00:00Z').getTime(),
        content: "Hi Mary, how are you?",
        timestamp: new Date('2023-01-01T10:00:00Z'),
        sender: user1
      },
      {
        id: new Date('2023-01-01T10:05:00Z').getTime(),
        content: "Hi John! I'm good, thanks for asking.",
        timestamp: new Date('2023-01-01T10:05:00Z'),
        sender: user2
      }
    ]
  },
]);