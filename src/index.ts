import { app } from './app'
import { db, seeds } from './../src/data-access/db-scripts'
import { User, Group } from './../src/models'

const start = async() => {
    
    try {
        User.belongsToMany(Group, { through: 'UserGroup', onDelete: 'CASCADE' });
        Group.belongsToMany(User, { through: 'UserGroup', onDelete: 'CASCADE' });
        await db.authenticate();
        await db.sync({ force: true, alter: false });
        await db.query(seeds);
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!')
    })
}

start()