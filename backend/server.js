// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { verifyToken } = require('./utils/auth');

const app = express();

// ✅ Strict and safe CORS config
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(graphqlUploadExpress());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Apollo Server with Auth Context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = verifyToken(token);
        return { user };
      } catch (err) {
        console.log('Token error:', err.message);
      }
    }
    return {};
  },
});

async function start() {
  try {
    await sequelize.sync(); // Sync models with DB
    await server.start();
    
    // ✅ Disable Apollo’s internal CORS handling
    server.applyMiddleware({ app, cors: false });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (e) {
    console.error('Startup error:', e);
  }
}

start();
