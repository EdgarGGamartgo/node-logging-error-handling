import { DataTypes, Sequelize } from 'sequelize';
import { GroupStatic } from './../types/GroupTypes';
import { db } from './../data-access/db-scripts'
import { Permission } from './../enums/PermissionEnum'

export function GroupFactory (sequelize: Sequelize): GroupStatic {
    return <GroupStatic>sequelize.define("group", {
        id: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.ENUM({
                values: Object.values(Permission)
            })),
            allowNull: false,
            unique: false,
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
        // updatedAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
    }, {
        timestamps: false
    });
}

export const Group = GroupFactory(db)
