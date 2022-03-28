import { GraphQLInt, GraphQLString } from "graphql";

import { UserType } from "../TypeDefs/User";
import { Users, IUser } from "../../Entities/Users";

export const CREATE_USER = {
  type: UserType,
  args: {
    id_student: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent: any, args: IUser) {
    await Users.insert(args);
  },
};
