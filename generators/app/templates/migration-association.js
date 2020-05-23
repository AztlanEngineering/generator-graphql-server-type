/* <%= pkg %> <%= version %> */
const tableName = '' //Should equal the one defined in models
const foreignKeyColumnName = ''
const foreignModelTableName = ''

async function up(queryInterface, Sequelize) {
  return queryInterface.addColumn(
    tableName,
    foreignKeyColumnName,
    {
      type      :Sequelize.DataTypes.UUID,
      references:{
        model:foreignModelTableName,
        key  :'id',
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    }

  )
}

async function down(queryInterface, Sequelize) {
  return queryInterface.removeColumn(
    tableName,
    foreignKeyColumnName
  )
}

module.exports = { up, down }

