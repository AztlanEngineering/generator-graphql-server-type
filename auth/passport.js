/* eslint-disable no-console */
import { User } from './models'
import fs from 'fs'

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const opts = {}

//const format = process.env.JWT_SECRET ? 'HS512' : 'RS256'
//opts.secretOrKey = (format === 'HS512') ? process.env.JWT_SECRET : fs.readFileSync('./keys/jwt_public.pem', 'utf8')

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'yooo' //process.env.JWT_SECRET
opts.issuer = ''
opts.audience = ''
opts.algorithms = [
  'HS512'
]

const JWTS = new JWTStrategy(opts, (jwt_payload, done) => {
  if (process.env.DEBUG === 'true')(
    console.log('TOKEN INFORMATION', jwt_payload)
  )
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    })
    .catch(err => console.error(err))
})

export default function(passport) {
  passport.use(JWTS)
}
