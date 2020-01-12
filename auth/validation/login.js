import V from 'validator'
import { isEmpty } from 'utils'

export default function validateLoginInput(d) {
  let e = {}
  d.email = !isEmpty(d.email) ? d.email : ''
  d.password = !isEmpty(d.password) ? d.password : ''

  if (!V.isEmail(d.email)) {
    e.email = 'Email is invalid'
  }

  if (V.isEmpty(d.email)) {
    e.email = 'Email is required'
  }

  if (!V.isLength(d.password, { min: 6, max: 30 })) {
    e.password = 'Password must have 6 chars'
  }

  if (V.isEmpty(d.password)) {
    e.password = 'Password is required'
  }

  return {
    errors :e,
    isValid:isEmpty(e)
  }
}
