import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { readFile } from 'fs/promises';
import gql from 'graphql-tag';

const typeDefs = gql( await readFile('./api/locations.graphql', { encoding: 'utf-8' }) );

const app = express();

const cwd = process.cwd();

console.log( { cwd, typeDefs } );

app.get( '/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Welcome`);
});

export default app;