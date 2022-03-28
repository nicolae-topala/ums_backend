import { GraphQLList } from "graphql";

import { UserType } from "../TypeDefs/User";
import { Users, IUser } from "../../Entities/Users";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve(): Promise<IUser[]> {
    return Users.find();
  },
};
