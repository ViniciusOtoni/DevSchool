import initModels from './models/init-models.js';

import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'DevShcool', 
    'root', 
    '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const db = initModels(sequelize);
export default db;