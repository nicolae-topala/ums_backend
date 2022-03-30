import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";

import { UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Message";
import { Users, IUser } from "../../Models/Users";

export const CREATE_USER = {
  type: MessageType,
  args: {
    id_student: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent: any, args: IUser) {
    await Users.insert(args);

    return { successful: true, message: "User Created !" };
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(
    parent: any,
    args: { username: string; password: string; newPassword: string }
  ) {
    const { username, password, newPassword } = args;
    const user = await Users.findOneBy({ username: username });
    if (!user) {
      throw new Error("Username doesn't exist!");
    }

    const userPassword = user?.password;

    if (password === userPassword) {
      await Users.update({ username: username }, { password: newPassword });

      return { successful: true, message: "Password updated successfully !" };
    } else {
      throw new Error("Passwords do not match!");
    }
  },
};
