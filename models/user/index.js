const UserModel = (dbCon, Sequelize) => {
    const Model = dbCon.define(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { freezeTableName: true }
    );
    return Model;
  };
  
  module.exports = UserModel;
  