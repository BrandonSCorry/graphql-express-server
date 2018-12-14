const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        jedi(id: Int!): Jedi
        jedis(crystal: String): [Jedi]
    }
    type Mutation {
        updateJediCrystal(id: Int!, crystal: String!): Jedi 
    }
    type Jedi {
        id: Int
        name: String
        age: Int
        description: String
        crystal: String
        photo: String
    }
`);

var jedisData = [
  {
      id: 1,
      name: 'Luke Skywalker',
      age: 30,
      description: 'Son of Anakin Skywalker and Queen Amidala, grew up on Tatooine',
      crystal: 'Blue',
      photo: 'urlhere'
  },
  {
    id: 2,
    name: 'Leia Organa',
    age: 32,
    description: 'Daughter of Anakin Skywalker and Queen Amidala, Ben Solo is her son',
    crystal: 'Blue',
    photo: 'url'
  },
  {
    id: 3,
    name: 'Master Yoda',
    age: 1000,
    description: 'Little Green Force Master',
    crystal: 'Green',
    photo: 'url'
  },
  {
    id: 3,
    name: 'Mace Windu',
    age: 45,
    description: 'Wants Anakin to take a seat. Played by Samuel L Jackson.',
    crystal: 'Purple',
    photo: 'url'
  }
]

const getJedi = function(args) {
    const id = args.id;
    return jedisData.filter(jedi => {
        return jedi.id == id;
    })[0];
}

const getJedis = function(args) {
    if (args.crystal) {
        const crystal = args.crystal;
        return jedisData.filter(jedi => jedi.crystal == crystal);
    } else {
        return jedisData;
    }
}

const updateJediCrystal = function({id, crystal}) {
    jedisData.map(jedi => {
        if (jedi.id === id) {
            jedi.crystal = crystal;
            return jedi;
        }
    });
    return jedisData.filter(jedi => jedi.id === id)[0];
}


// GraphQL Root Resolver
const root = {
    jedi: getJedi,
    jedis: getJedis,
    updateJediCrystal: updateJediCrystal
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

