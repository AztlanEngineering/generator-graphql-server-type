/* <%= pkg %> <%= version %> */
import V from 'validator'
import { isEmpty } from 'utils'

export default function validateSignupInput(d) {
  let e = {}
  d.last_name = !isEmpty(d.last_name) ? d.last_name : ''
  // d.password_confirm = !isEmpty(d.password_confirm) ? d.password_confirm : ''

  if (!V.isLength(d.first_name, { min: 2, max: 30 })) {
    e.first_name = 'First name must be between 2 to 30 chars'
  }

  if (V.isEmpty(d.last_name)) {
    e.last_name = 'Last name field is required'
  }

  if (!V.isEmail(d.email)) {
    e.email = 'Email is invalid'
  }

  if (!V.isLength(d.password, { min: 6, max: 30 })) {
    e.password = 'Password must have 6 chars'
  }

  // if(!V.equals(d.password, d.password_confirm)) {
  // e.password_confirm = 'Password and Confirm Password must match'
  // }

  return {
    errors :e,
    isValid:isEmpty(e)
  }
}
