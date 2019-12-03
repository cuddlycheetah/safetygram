const config = require('../config')
const express = require('../node_modules/express')
var express_graphql = require('../node_modules/express-graphql');

const microService = express()
// MongoDB
const { mongoose, GridFS, Models } = require('../database')
// Root resolver
var root = {
    message: () => 'Hello World!'
}
// Create an express server and a GraphQL endpoint
const schema = require('../models/graphql')
microService.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
microService.use('/file/:file', async (req, res) => {
    const fileInfo = await Models.File.findById(req.params.file)
    if (!fileInfo) return res.status(404).json(false)
    return GridFS.getFileStream(fileInfo.gridfs)
        .then((item) => {
            item
            .once("error", () => res.status(400).end())
            .pipe(res)
        })
        .catch(() => res.status(500))
    return res.json(fileInfo)
})

microService.listen(config.frontendApi.port, config.frontendApi.host, 
    () => console.log(`Express GraphQL Server Now Running On localhost:${ config.frontendApi.port }/graphql`))
;