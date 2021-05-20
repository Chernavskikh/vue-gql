const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config({ path: 'variables.env'});

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

mongoose
  .connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
  )
  .then(() => { console.log('DB connected')})
  .catch((err) => console.log(err));

// verify jwt token
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch(err) {
      throw new AuthenticationError('Your session has ended. Please sign in again');
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'];
    console.log({token})
    return { User, Post, currentUser: await getUser(token)}
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
