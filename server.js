const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config({ path: 'variables.env'});

const fs = require('fs');
const path = require('path');

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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post,
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
