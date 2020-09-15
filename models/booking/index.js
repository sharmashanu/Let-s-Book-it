const BookingModel = (dbCon, Sequelize) => {
    const Model = dbCon.define(
      "booking",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        busId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        seatsBooked: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { freezeTableName: true }
    );
    return Model;
  };
  
  module.exports = BookingModel;
  