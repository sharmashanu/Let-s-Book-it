const SeatModel = (dbCon, Sequelize) => {
  const Model = dbCon.define(
    "seat",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      day: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      available: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      busId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return Model;
};

module.exports = SeatModel;
