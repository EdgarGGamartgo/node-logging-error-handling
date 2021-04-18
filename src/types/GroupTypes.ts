import { BuildOptions, Model } from "sequelize";

export interface GroupAttrs {
    id?: string;
    name: string;
    permission: string[];
    // createdAt?: Date;
    // updatedAt?: Date;
  }

export interface GroupModel extends Model <GroupAttrs>, GroupAttrs {}
export class Group extends Model <GroupModel, GroupAttrs> {}

export type GroupStatic = typeof Model & {
     new (values?: object, options?: BuildOptions):  GroupModel;
};

