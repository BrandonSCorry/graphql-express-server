const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

// GraphQL Root Resolver
const root = {
    message: () => 'Hello World'
};

// Create express server and GraphQL end-point
const app = express();
// Connect express middleware to end-point
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL server now running on localhost:4000/graphql'));

