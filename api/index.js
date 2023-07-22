import path from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import gql from 'graphql-tag';

import resolvers from './resolvers.js';
import LocationsAPI from './datasources/LocationsApi.js';

const typeDefs = gql`
type Query {
  "The full list of locations presented by the Interplanetary Space Tourism department"
  locations: [Location!]!
  "The details of a specific location"
  location(id: ID!): Location
}

type Location {
  id: ID!
  "The name of the location"
  name: String!
  "A short description about the location"
  description: String!
  "The location's main photo as a URL"
  photo: String!
}
`;

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer( app );

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors(),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  bodyParser.json({ limit: '50mb' }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware( server, {
    context: async ({ req }) => ({ 
      dataSources: {
        locationsAPI: new LocationsAPI(),
      },
    }),
  }),
);

export default app;


