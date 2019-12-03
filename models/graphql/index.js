
const { schemaComposer } = require('../../node_modules/graphql-compose')

require('./$Chat')
require('./$ChatNameset')

require('./$User')
require('./$UserInfo')
require('./$UserNameset')

require('./$Message')
require('./$File')

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema