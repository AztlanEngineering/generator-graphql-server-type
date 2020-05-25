/* <%= pkg %> <%= version %> */
import * as faker from 'faker'

import { generateTestDataFrom } from 'utils'

const generateFake = () => {
  return {
    firstName:faker.name.firstName(),
    lastName :faker.name.lastName(),
    email    :faker.internet.email().toLowerCase(),
    username :faker.internet.userName(),
    handle   :faker.internet.userName(),
    superuser:faker.random.boolean(),
    isActive :faker.random.boolean(),

    name              :faker.company.companyName(),
    slug              :faker.helpers.slugify(faker.company.companyName().toLowerCase()),
    //publicPhoneNumber  :faker.phone.phoneNumber(),
    publicPhoneNumber :String(faker.random.number(10**6, 10**10)),
    privatePhoneNumber:String(faker.random.number(10**6, 10**10)),
    address           :faker.address.streetAddress(),
    address2          :faker.address.streetAddress(),
    city              :faker.address.city(),
    postcode          :faker.address.zipCode(),
    country           :faker.address.country(),
    data              :{
      k:faker.random.words(8)
    }
    


  }
}

export default (options={}) => generateTestDataFrom(
  generateFake,
  options
)
