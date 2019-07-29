module.exports = { up: (queryInterface, Sequelize) => queryInterface.createTable('Highlight', { id: { allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER },
userId: { type: Sequelize.INTEGER,
  allowNull: false },
articleId: { type: Sequelize.INTEGER,
  allowNull: false },
indexStart: { type: Sequelize.INTEGER,
  allowNull: false },
indexEnd: { type: Sequelize.INTEGER,
  allowNull: false },
text: { type: Sequelize.TEXT,
  allowNull: false },
comment: { type: Sequelize.TEXT,
  allowNull: false },
highlighted: { type: Sequelize.BOOLEAN },
createdAt: { allowNull: false,
  type: Sequelize.DATE },
updatedAt: { allowNull: false,
  type: Sequelize.DATE } }),
// eslint-disable-next-line no-unused-vars
down: (queryInterface, Sequelize) => queryInterface.dropTable('Highlight') };