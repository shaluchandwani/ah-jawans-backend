

module.exports = { up: (queryInterface, Sequelize) => queryInterface.createTable('LikeAndDislike', { id: { allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER },
userId: { type: Sequelize.INTEGER },
likes: { type: Sequelize.BOOLEAN },
dislikes: { type: Sequelize.BOOLEAN },
articleId: { type: Sequelize.INTEGER },
createdAt: { allowNull: false,
  type: Sequelize.DATE },
updatedAt: { allowNull: false,
  type: Sequelize.DATE } }),
// eslint-disable-next-line no-unused-vars
down: (queryInterface, Sequelize) => queryInterface.dropTable('LikeAndDislike') };