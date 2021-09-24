
let vueBuilderConfig =  require('./VueBuilder.js')

class PluginMasterBuilderConfig {

    vue(customConfig){

     return   vueBuilderConfig.getConfig(customConfig)

    }
}

let PluginMasterInstance = new PluginMasterBuilderConfig()


module.exports = PluginMasterInstance
