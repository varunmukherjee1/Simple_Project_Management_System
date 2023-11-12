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

const  ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        description:{type: GraphQLString},
        status:{type: GraphQLString},
        client: {
            type: ClientType,
            resolve: (parent,args) => {
                return clients.find((cli) => cli.id === parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        clients: {
            type: GraphQLList(ClientType),
            resolve: () => {
                return clients
            }
        },
        client: {
            type: ClientType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent,args) => {
                return clients.find(cli => cli.id === args.id)
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve: () => {
                return projects
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent,args) => {
                return projects.find(cli => cli.id === args.id)
            }
        },
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
});