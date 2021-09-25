class PluginMasterBuilderConfig {

    vue(customConfig) {
        let vueBuilderConfig = require('./VueBuilder.js')
        return vueBuilderConfig.getConfig(customConfig)

    }

    react(customConfig) {
        let ReactBuilderConfig = require('./ReactBuilder.js')
        return ReactBuilderConfig.getConfig(customConfig)

    }
}

let PluginMasterInstance = new PluginMasterBuilderConfig()


module.exports = PluginMasterInstance
