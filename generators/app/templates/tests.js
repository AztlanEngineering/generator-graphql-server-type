/* <%= pkg %> <%= version %> */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { assert, expect } = chai

import { <%= schema %>Controller as MainController } from '../controllers'
import models from 'models'
import * as faker from 'faker'

import { generateTest<%= schema %> as generateFakeData } from './generators'


const Model = models.<%= schema %>


  /*
//FM for ForeignModel
const FM_A = {
  generateData:() => generateTestUser(),
  model       :models.User,
  foreignKey  :'ownerId',
  references  :'id',
  as          :'user'
}

const FM_B = {
  generateData:() => generateTestSite(),
  model       :models.Site,
  foreignKey  :'siteId',
  references  :'id',
  as          :'website'
}
  */


describe('<%= local_package_name %> -> <%= schema%> Model', function() {
  /*
  before( function(){
  })

  beforeEach( function(){
  })
  */

  describe('Model -> Key -> Code', function() {
    it('Default Value -> The default code is a unique 64 char string', async function() {
      const data1 = generateFakeData()
      const data2 = generateFakeData()
      const records = await Model.bulkCreate([data1, data2])
      const { code:code1 } = records[0]
      const { code:code2 } = records[1]
      expect( code1 ).to.have.lengthOf(64)
      expect( code2 ).to.have.lengthOf(64)
      expect( code1 ).to.not.deep.equal(code2)
      records.forEach((e) =>
        e.destroy()
      )
    })
  
  })
  
  describe('Model -> Virtual -> IsValid', function() {
    it('Model API -> An instance is valid ioi it expires later than now', async function() {
      const data1 = generateFakeData()
      const data2 = generateFakeData({ expires: Date.now() - (Number(200 * 1000)) })
      const records = await Model.bulkCreate([data1, data2])
      expect( records[0].is_valid ).to.equal(true)
      expect( records[1].is_valid ).to.equal(false)
      records.forEach((e) =>
        e.destroy()
      )
    })
  
  })

  /*
  afterEach( function(){
  })

  after( function(){
  })
  */
})

describe('<%= local_package_name %> -> <%= schema %> Controller', function() {
  /*
  before( function(){
  })

  beforeEach( function(){
  })
  */


  describe('Controller -> Get all', function() {
    it('Admin API -> The objects retrieved equals the objects looked for', async function() {
       // NOTE for date comparison in deep include with the raw func, we need to generate date in the TW format using new Date() instead of Date.now()
       // 1. We generate two items
       const data1 = generateFakeData()
       const data2 = generateFakeData()
       const records = await Model.bulkCreate([data1, data2], {})
      
       // 2. We test they are generated properly, and we keep their ids
       //expect(records[0]).to.deep.include(data1)
       //expect(records[1]).to.deep.include(data2)
      
       const { id:id1 } = records[0]
       const { id:id2 } = records[1]
      
       // 3. We get all the items in the DB, in which we check the generated items are present
       const rows = await MainController.all({})
      
       const s1 = rows.find(e => e.id === id1)
       const s2 = rows.find(e => e.id === id2)
       assert.exists(s1.id, 'We shouldnt deep test inclusion of empty item')
       assert.exists(s2.id, 'We shouldnt deep test inclusion of empty item')
      
       // 4. We compare the found item with the generated one
       expect(s1).to.deep.include(data1)
       expect(s2).to.deep.include(data2) //Include instead of equal because if there is a foreign key, it will be developped in the controller get all method
       //expect(rows).to.deep.include.members([ r1, r2 ])
      
       // 5.Cleanup
       records.forEach((e) =>
         e.destroy()
       )
    })

    
   describe('Controller -> Search', function() {
     it('Admin API -> We create an item in the db. It correctly shows up in the search results', async function() {
       const data = generateFakeData()
       const inst = await Model.create( data )
       const results = await MainController.search({}, { expression:data.name.substring(0,3).toLowerCase() })
       const originalInst = results.find(e => e.id === inst.id)
       //console.log('Found original inst', originalInst.toJSON())
       expect(originalInst).to.deep.include(data)

       inst.destroy()
     })
   })


    
    /*
    it('Admin API -> The objects retrieved equals the objects looked for, including associations', async function() {
      // O. We prepare the FK Data
      const instFM_A1 = await FM_A.model.create(FM_A.generateData(), { plain: true })
      const instFM_A2 = await FM_A.model.create(FM_A.generateData(), { plain: true })
    
      //const instFM_B1 = await FM_B.model.create(FM_B.generateData(), { plain: true })
      //const instFM_B2 = await FM_B.model.create(FM_B.generateData(), { plain: true })
    
      //console.log(instUser1, instSite2)
    
      // 1. We generate two items
      const data1 = generateFakeData({
        [FM_A.foreignKey]:instFM_A1[FM_A.references],
        //[FM_B.foreignKey]:instFM_B1[FM_B.references]
      })
    
      const data2 = generateFakeData({
        [FM_A.foreignKey]:instFM_A2[FM_A.references],
        //[FM_B.foreignKey]:instFM_B2[FM_B.references]
      })
    
      const records = await Model.bulkCreate([data1, data2], {})
    
      // 2. We test they are generated properly, and we keep their irds
      expect(records[0]).to.deep.include(data1)
      expect(records[1]).to.deep.include(data2)
    
      const { id:id1 } = records[0]
      const { id:id2 } = records[1]
    
      // 3. We get all the items in the DB, in which we check the generated items are present
      const rows = await MainController.all({})
    
      const s1 = rows.find(e => e.id === id1)
      const s2 = rows.find(e => e.id === id2)
      assert.exists(s1.id, 'We shouldnt deep test inclusion of empty item')
      assert.exists(s2.id, 'We shouldnt deep test inclusion of empty item')
    
      // 4. We compare the found item with the generated one
      expect(s1).to.deep.include({
        ...data1,
        [FM_A.as]:instFM_A1.dataValues,
        //[FM_B.as]:instFM_B1.dataValues
      })
      expect(s2).to.deep.include({
        ...data2,
        [FM_A.as]:instFM_A2.dataValues,
        //[FM_B.as]:instFM_B2.dataValues
      })
      //expect(rows).to.deep.include.members([ r1, r2 ])
    
      // 5.Cleanup
      records.forEach((e) =>
        e.destroy()
      )
      instFM_A1.destroy()
      instFM_A2.destroy()
      //instFM_B1.destroy()
      //instFM_B2.destroy()
    })
    */
    
    
  })

  describe('Controller -> Get one', function() {
    it('Admin API -> The object retrieved correspond to the objects looked for', async function() {
      const data = generateFakeData()
      const { id } = await Model.create( data )
      const inst = await MainController.get({}, { id })
      expect(inst).to.deep.include({id, ...data})
      inst.destroy()
    })

    /*
    it('Admin API -> The object retrieved correspond to the objects looked for, including associations', async function() {
      const instFM_A = await FM_A.model.create(FM_A.generateData(), { plain: true })
      //const instFM_B = await FM_B.model.create(FM_B.generateData(), { plain: true })

      const data = generateFakeData({
        [FM_A.foreignKey]:instFM_A[FM_A.references],
        //[FM_B.foreignKey]:instFM_B[FM_B.references]
      })

      const { id } = await Model.create( data )
      const inst = await MainController.get({}, { id })
      expect(inst).to.deep.include({ id, ...data })
      expect(inst[FM_A.as].dataValues).to.deep.include(instFM_A.dataValues)
      //expect(inst[FM_B.as].dataValues).to.deep.include(instFM_B.dataValues)
      inst.destroy()
      instFM_A.destroy()
      //instFM_B.destroy()
    })
    */

  })

  describe('Controller -> Add', function() {
    it('Admin API -> The object created equals the specs given', async function() {
      const input = generateFakeData()
      const inst = await MainController.add({}, { input })
      expect(inst).to.deep.include(input)
      inst.destroy()
    })

    /*
    it('Admin API -> The object created equals the specs given, including associations', async function() {
      const instFM_A = await FM_A.model.create(FM_A.generateData(), { plain: true })
      //const instFM_B = await FM_B.model.create(FM_B.generateData(), { plain: true })

      const input = generateFakeData({
        [FM_A.foreignKey]:instFM_A[FM_A.references],
        //[FM_B.foreignKey]:instFM_B[FM_B.references]
      })

      const inst = await MainController.add({}, { input })
      expect(inst).to.deep.include(input)
      //expect(inst[FM_A.as].dataValues).to.deep.include(instFM_A.dataValues)
      //expect(inst[FM_B.as].dataValues).to.deep.include(instFM_B.dataValues) //
      //https://github.com/sequelize/sequelize/issues/3807
      inst.destroy()
      instFM_A.destroy()
      //instFM_B.destroy()
    })
    */


  })

  describe('Controller -> Update', function() {
    it('Admin API -> The object is successfully updated', async function() {
      const data = generateFakeData()
      const { id } = await Model.create( data )
      const input = generateFakeData()
      const inst = await MainController.update({}, { id, input })
      expect(inst).to.deep.include({id, ...input})
      inst.destroy()
    })

    /*
    it('Admin API -> The object is successfully updated, with associations', async function() {
      const instFM_A = await FM_A.model.create(FM_A.generateData(), { plain: true })
      //const instFM_B = await FM_B.model.create(FM_B.generateData(), { plain: true })

      const data = generateFakeData({
        [FM_A.foreignKey]:instFM_A[FM_A.references],
        //[FM_B.foreignKey]:instFM_B[FM_B.references]
      })

      const { id } = await Model.create( data )
      const input = generateFakeData()
      const inst = await MainController.update({}, { id, input })
      expect(inst).to.deep.include({id, ...input})
      inst.destroy()
      instFM_A.destroy()
      //instFM_B.destroy()
    })
    */

  })

  describe('Controller -> Delete', function() {
    it('Admin API -> The object is successfully deleted', async function() {
      const data = generateFakeData()
      const { id } = await Model.create( data )
      const success = await MainController.delete({}, { id })
      assert( success === id, `The controller should respond ${id} to the deletion command`)
      await Model.findByPk(id, { transaction: null }) //there is a little time for the deletion to actually happen, so we auery twice
      const objectShouldntRemain = await Model.findByPk(id, { transaction: null })
      expect( objectShouldntRemain ).to.equal(null)
      //assert( Model.findByPk( id ) == null, 'There should be no item anymore in the db')
    })
  })

  /*
  afterEach( function(){
  })

  after( function(){
  })
  */
})



