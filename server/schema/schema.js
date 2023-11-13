// const {projects,clients} = require("../dummyData/sampleData")

const Project = require('../models/Project');
const Client = require('../models/Client');

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

// Project Type

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
                return Client.findById(parent.clientId);
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
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent,args) => {
                return Client.findById(args.id);
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve: () => {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent,args) => {
                return Project.findById(args.id)
            }
        },
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent,args) => {
                const clientObj = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })

                return clientObj.save();
            }
        },
        // Delete Client
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent,args) => {
                Project.find({clientId: args.id})
                    .then(projects => {
                        projects.forEach((project) => {
                            project.deleteOne();
                        })
                    })

                return Client.findByIdAndDelete(args.id);
            }
        },
        // Add project
        addProject: {

        },
        // Delte project
        deleteProject: {

        },
        // Update Project
        updateProject: {
            
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});