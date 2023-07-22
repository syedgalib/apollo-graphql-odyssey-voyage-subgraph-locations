import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import gql from 'graphql-tag';


// const locationsGraph = './api/locations.graphql';
const locationsGraphPath = path.resolve( process.cwd(), 'api/locations.graphql' );

const typeDefs = gql( readFileSync( locationsGraphPath, { encoding: 'utf8' } ) );

console.log( { locationsGraphPath, typeDefs } );

const app = express();

app.get( '/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Welcome`);
});

export default app;