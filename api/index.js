import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { readFile, readFileSync } from 'fs';
import path from 'path';
import fsPromises from 'fs/promises';
import gql from 'graphql-tag';


async function readDataFromFile( filePath ) {
    try {
        return readFileSync( filePath, { encoding: 'utf8' } );
    } catch (error) {

        console.log( { error } );

        return '';
    }
}

const filePath = './api/locations.graphql';

const data = await readDataFromFile( filePath );
console.log( { data } );

// const typeDefs = gql( await readDataFromFile('./locations.graphql') );

const app = express();

app.get( '/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Welcome`);
});

export default app;