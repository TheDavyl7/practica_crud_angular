import { Sequelize } from "sequelize";

const sequelize = new Sequelize('almacen', 'root', 'RootPassword07', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;