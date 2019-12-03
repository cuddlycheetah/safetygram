const { composeWithMongoose } = require('../../node_modules/graphql-compose-mongoose/node8');
const { schemaComposer } = require('../../node_modules/graphql-compose')

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const Model = require('../UserInfo')
const customizationOptions = {}; // left it empty for simplicity, described below
const ModelTC = composeWithMongoose(Model, customizationOptions);

const prefix = "userInfo"

schemaComposer.Query.addFields({
    [prefix + 'ById']: ModelTC.getResolver('findById'),
    [prefix + 'ByIds']: ModelTC.getResolver('findByIds'),
    [prefix + 'One']: ModelTC.getResolver('findOne'),
    [prefix + 'Many']: ModelTC.getResolver('findMany'),
    [prefix + 'Count']: ModelTC.getResolver('count'),
    [prefix + 'Connection']: ModelTC.getResolver('connection'),
    [prefix + 'Pagination']: ModelTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
    [prefix + 'CreateOne']: ModelTC.getResolver('createOne'),
    [prefix + 'CreateMany']: ModelTC.getResolver('createMany'),
    [prefix + 'UpdateById']: ModelTC.getResolver('updateById'),
    [prefix + 'UpdateOne']: ModelTC.getResolver('updateOne'),
    [prefix + 'UpdateMany']: ModelTC.getResolver('updateMany'),
    [prefix + 'RemoveById']: ModelTC.getResolver('removeById'),
    [prefix + 'RemoveOne']: ModelTC.getResolver('removeOne'),
    [prefix + 'RemoveMany']: ModelTC.getResolver('removeMany'),
});