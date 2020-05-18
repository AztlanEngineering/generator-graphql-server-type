/* <%= pkg %> <%= version %> */
import { Sequelize, DataTypes, Model } from 'sequelize'
import sequelize from 'connector'

class <%= Schema %> extends Model {

  static classLevelMethod() {
  }

  instanceLevelMethod() {
    return this.first_name
  }

} 

<%= Schema %>.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true,
  },
  a: {
    type: DataTypes.STRING,
    //type: DataTypes.BOOLEAN,
    //type: DataTypes.INTEGER,
    //type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue:'john',
    //unique:true
    //field:'column_name_here'
  },

  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },

  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },

  /*
  uuid:{
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  }
  */
},{
  sequelize,
  modelName:'<%= Schema %>',
  //tableName: '<%= lower_plural %>'
  //freezeTableName: true
})

//<%= Schema %>.addHook('afterCreate', 'hookName', (e, options) => {})

export default <%= Schema %>
