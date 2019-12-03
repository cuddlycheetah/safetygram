const { composeWithMongoose } = require('../../node_modules/graphql-compose-mongoose/node8');
const { schemaComposer } = require('../../node_modules/graphql-compose')

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const Model = require('../Chat')
const customizationOptions = {}; // left it empty for simplicity, described below
const ModelTC = composeWithMongoose(Model, customizationOptions);


schemaComposer.Query.addFields({
    chatById: ModelTC.getResolver('findById'),
    chatByIds: ModelTC.getResolver('findByIds'),
    chatOne: ModelTC.getResolver('findOne'),
    chatMany: ModelTC.getResolver('findMany'),
    chatCount: ModelTC.getResolver('count'),
    chatConnection: ModelTC.getResolver('connection'),
    chatPagination: ModelTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
    chatCreateOne: ModelTC.getResolver('createOne'),
    chatCreateMany: ModelTC.getResolver('createMany'),
    chatUpdateById: ModelTC.getResolver('updateById'),
    chatUpdateOne: ModelTC.getResolver('updateOne'),
    chatUpdateMany: ModelTC.getResolver('updateMany'),
    chatRemoveById: ModelTC.getResolver('removeById'),
    chatRemoveOne: ModelTC.getResolver('removeOne'),
    chatRemoveMany: ModelTC.getResolver('removeMany'),
});