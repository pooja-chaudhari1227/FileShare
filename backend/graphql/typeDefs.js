const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Upload

  type User {
    id: ID!
    email: String!
  }

  type File {
    id: ID!
    filename: String!
    originalName: String!
    mimetype: String
    path: String
    createdAt: String!
    uploadedBy: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    myFiles: [File]
    allFiles: [File]
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    uploadFile(file: Upload!): File
  }
`;
