import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import fs from 'fs';
import fsPromises from 'fs/promises';
import gql from 'graphql-tag';

const fileExists = function( filePath ) {
    fs.access( filePath, fs.constants.F_OK, (err) => {
        console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
    });
}

fileExists( './locations.graphql' );
fileExists( './api/locations.graphql' );

const cwd = process.cwd();
console.log( { cwd } );


async function readDataFromFile( filePath ) {
    try {
        return await fsPromises.readFile( filePath, { encoding: 'utf8' } );
    } catch (error) {

        console.log( { error } );

        return '';
    }
}

// const typeDefs = gql( await readDataFromFile('./locations.graphql') );

const app = express();

app.get( '/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Welcome`);
});

export default app;