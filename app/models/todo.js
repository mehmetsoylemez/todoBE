module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Todo;
};
