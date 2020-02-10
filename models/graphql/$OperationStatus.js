const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const { schemaComposer } = require('graphql-compose')

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const Model = require('../OperationStatus')
const customizationOptions = {}; // left it empty for simplicity, described below
const ModelTC = composeWithMongoose(Model, customizationOptions);

const prefix = "operationStatus"

schemaComposer.Query.addFields({
    [prefix + 'ById']: ModelTC.getResolver('findById'),
    [prefix + 'One']: ModelTC.getResolver('findOne'),
    [prefix + 'Many']: ModelTC.getResolver('findMany'),
    [prefix + 'Count']: ModelTC.getResolver('count'),
});

schemaComposer.Mutation.addFields({
    [prefix + 'UpdateById']: ModelTC.getResolver('updateById'),
    [prefix + 'UpdateOne']: ModelTC.getResolver('updateOne'),
    [prefix + 'UpdateMany']: ModelTC.getResolver('updateMany'),
    [prefix + 'RemoveById']: ModelTC.getResolver('removeById'),
});