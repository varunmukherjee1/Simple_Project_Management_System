const {projects,clients} = require("../dummyData/sampleData")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Client Type

const  ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        email:{type: GraphQLString},
        phone:{type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        client: {
            type: ClientType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent,args) => {
                return clients.find(cli => cli.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
});