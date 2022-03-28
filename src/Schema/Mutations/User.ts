import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";

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

export const UPDATE_PASSWORD = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: IUser) {
    const { username, password, newPassword } = args;
    const user = await Users.findOneBy({ username: username });
    const userPassword = user?.password;

    if (password === userPassword) {
      await Users.update({ username: username }, { password: newPassword });
    } else {
      throw new Error("Passwords do not match!");
    }
  },
};
