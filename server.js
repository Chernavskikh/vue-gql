const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config({ path: 'variables.env'});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log('DB connected')})
    .catch((err) => console.log(err));


const todos = [
    { task: 'Wash car', completed: false },
    { task: 'Clean room', completed: true }
];
// The GraphQL schema
const typeDefs = gql`

    type Todo {
        task: String
        completed: Boolean
    }
    
    type Query {
        getTodos: [Todo]
    }
    
    type Mutation {
        addTodo(task: String, completed: Boolean): Todo
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        getTodos: () => todos,
    },
    Mutation: {
        addTodo: (_, args) => {
            const todo = {task: args.task, completed: args.completed };
            todos.push(todo);
            return todo;
        }
    },
};

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
