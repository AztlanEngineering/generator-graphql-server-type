const Generator = require('yeoman-generator')
const chalk = require('chalk')
//const yosay = require('yosay')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')//For no confirm append
const replace = require('replace-in-file')

let pjson = require('../../package.json')
const version = pjson.version

function pascalToSnake(s){
  return s
    .replace(/(?:^|\.?)([A-Z])/g, (x,y) => '_' + y.toLowerCase())
    .replace(/^_/, '')
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // This makes `appname` a required argument.
    this.argument('name', { type: String, required: true })

    this.option('validation', { type: String, alias: 'v' })

  }

  writing() {

    /* Setting up variables */
    const {
      name:fullname,
      validation
    } = this.options

    const [pkg,schema] = fullname.split('|')
    const lower = schema ? schema.toLowerCase() : null
    const lower_plural = lower ? lower + 's' : null
    const camel = schema.charAt(0).toLowerCase() + schema.slice(1)
    const name = schema

    this.log(
      `Generating files for module \x1b[32m\x1b[1m${pkg}\x1b[0m`,
      schema ? ` and schema \x1b[34m\x1b[1m${schema}\x1b[0m` : null,
      validation ? `and validation file \x1b[33m\x1b[1m${validation}\x1b[0m` : null,
      '\n'
    )
    //const lower = pascalToSnake()

    if (validation){
    }

    /* Making the new folder */
    const madeFolders = {
		  root       :mkdirp.sync(pkg),
      controllers:mkdirp.sync(pkg + '/controllers'),
      resolvers  :mkdirp.sync(pkg + '/resolvers'),
      types      :mkdirp.sync(pkg + '/types'),
      models     :mkdirp.sync(pkg + '/models'),
      validation :validation && mkdirp.sync(pkg + '/validation')
    }

    Object.keys(madeFolders).forEach((e) => {
      madeFolders[e] ? this.log('created folder ', `\x1b[1m\x1b[36m ${e} \x1b[0m`) :
        this.log(`folder \x1b[36m\x1b[1m ${e} \x1b[0m already present, skipping mkdir`)
    })

    const folder = './' + pkg  +'/'
    this.destinationRoot(folder)

    if (schema) {
      let local, localIndex
      const localIndexExists = () => this.fs.exists(localIndex)
      const touchFile = (relativeFilePath) => {
        const fullPath = path.resolve(path.join(process.cwd(), relativeFilePath))
        fs.closeSync(fs.openSync(fullPath, 'w'))
      }
      const createOrAppendToIndex = (a) => {
        const fullPathLocalIndex = path.resolve(path.join(process.cwd(), localIndex))

        if (!localIndexExists()){
          //this.fs.write(localIndex, '')
          touchFile(localIndex)
        }

        fs.appendFileSync(fullPathLocalIndex, a)
        this.log(`updated \x1b[36m\x1b[1m ${localIndex} \x1b[0m`)
      }

      /* Controller */
      local = 'controllers/'
      localIndex = local + 'index.js'
      createOrAppendToIndex(`export { default as ${schema}Controller } from './${schema}'\n`)

      this.fs.copyTpl(
        this.templatePath('controller.js'),
        this.destinationPath(path.join(local, schema + '.js')),
        { name, version }
      )

      /* Model */
      local = 'models/'
      localIndex = local + 'index.js'
      createOrAppendToIndex(`export { default as ${schema} } from './${schema}'\n`)

      this.fs.copyTpl(
        this.templatePath('model.js'),
        this.destinationPath(path.join(local, schema + '.js')),
        { lower_plural, version }
      )

      /* Resolvers */
      local = 'resolvers/'
      localIndex = local + 'index.js'
      if (!localIndexExists()) {
        this.fs.copyTpl(
          this.templatePath('index.resolvers.js'),
          this.destinationPath(localIndex),
          { name, version }
        )
        this.log(`created \x1b[36m\x1b[1m ${localIndex} \x1b[0m`)
      }
      else {
        const options1 = {
          files:localIndex,
          from :/\[/,
          to   :`\[\n  ${name}Resolvers,`
        }
        const options2 = {
          files:localIndex,
          from :/import/,
          to   :`import ${name}Resolvers from './${name}'\nimport`
        }

        const rResults1 = replace.sync(options1)
        const rResults2 = replace.sync(options2)

        this.log(`updated \x1b[36m\x1b[1m ${localIndex} \x1b[0m`)
        this.log(`with ${JSON.stringify(rResults1)}`)
      }

      this.fs.copyTpl(
        this.templatePath('resolvers.js'),
        this.destinationPath(path.join(local, schema + '.js')),
        { name, version }
      )

      /* Types */
      local = 'types/'
      localIndex = local + 'index.js'
      const stitchFile = local + '_stitch.graphql'
      touchFile(stitchFile)

      if (!localIndexExists()) {
        this.fs.copyTpl(
          this.templatePath('index.types.js'),
          this.destinationPath(localIndex),
          { name, version }
        )
        this.log(`created \x1b[36m\x1b[1m ${localIndex} \x1b[0m`)
      }

      else {
        const options1 = {
          files:localIndex,
          from :/\[/,
          to   :`\[\n  ${name}Types,`
        }
        const options2 = {
          files:localIndex,
          from :/import/,
          to   :`import ${name}Types from './${name}.graphql'\nimport`
        }

        const rResults1 = replace.sync(options1)
        const rResults2 = replace.sync(options2)

        this.log(`updated \x1b[36m\x1b[1m ${localIndex} \x1b[0m`)
        this.log(`with ${JSON.stringify(rResults1)}`)
      }

      this.fs.copyTpl(
        this.templatePath('type.graphql'),
        this.destinationPath(path.join(local, schema + '.graphql')),
        { name, version }
      )
      //createOrAppendToIndex(`yoyoyo ${schema}`)

    }

    if (this.options.validation){
      const local='validation'
      this.fs.copyTpl(
        this.templatePath('validation.js'),
        this.destinationPath(path.join(local, validation + '.js')),
        //{ name, version }
      )
    }

  }

  install() {
    //this.installDependencies();
  }
}
