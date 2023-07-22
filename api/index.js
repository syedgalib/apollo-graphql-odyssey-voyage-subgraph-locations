import express from 'express';
const app = express();

const typeDefs = gql( await readFile('./api/locations.graphql', { encoding: 'utf-8' }) );

console.log( { typeDefs } );

app.get( '/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Welcome`);
});

export default app;