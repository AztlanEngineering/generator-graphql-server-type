/* <%= pkg %> <%= version %> */
import { Sequelize, DataTypes, Model } from 'sequelize'

export default sequelize => {
  class <%= schema %> extends Model {
  
    /*
    static classLevelMethod() {
    }
  
    instanceLevelMethod() {
      return this.first_name
    }
    */
  
  } 
  
  <%= schema %>.init({
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
    modelName:'<%= schema %>',
    //tableName: '<%= lower_plural %>'
    //freezeTableName: true
  })

  
  <%= schema %>.associate = models => {
    <%= schema %>.belongsTo(models.User) //this will give a foreign key to user here, and make it available from here
    //models.User.hasMany(<% schema %>) //this will give this model a UserId field and make it available from user
  }


  //<%= schema %>.addHook('afterCreate', 'hookName', (e, options) => {})
}


