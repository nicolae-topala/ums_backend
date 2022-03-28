import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    id_stundet: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
