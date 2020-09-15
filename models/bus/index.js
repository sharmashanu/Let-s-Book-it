const BusModel = (dbCon, Sequelize) => {
  const Model = dbCon.define(
    "bus",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      busName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      busNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return Model;
};

module.exports = BusModel;
