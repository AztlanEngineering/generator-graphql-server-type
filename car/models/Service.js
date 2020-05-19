/* @fwrlines/generator-graphql-server-type 2.0.1 */
import { Sequelize, DataTypes, Model } from 'sequelize'

export default sequelize => {
  class Service extends Model {
  
    /*
    static classLevelMethod() {
    }
  
    instanceLevelMethod() {
      return this.first_name
    }
    */
  
  } 
  
  Service.init({
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
    modelName:'Service',
    //tableName: 'services'
    //freezeTableName: true
  })

  
  Service.associate = models => {
    Service.belongsTo(models.User) //this will give a foreign key to user here, and make it available from here
    //models.User.hasMany() //this will give this model a UserId field and make it available from user
  }


  //Service.addHook('afterCreate', 'hookName', (e, options) => {})
}


