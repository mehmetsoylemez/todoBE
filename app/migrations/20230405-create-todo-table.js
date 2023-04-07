module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('todos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' }
        }
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('todos'),
  };