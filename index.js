class PluginMasterBuilderConfig {

    vueWebpack(customConfig) {
        let vueBuilderConfig = require('./webpack/VueBuilder.js')
        return vueBuilderConfig.getConfig(customConfig)

    }

    reactWebpack(customConfig) {
        let ReactBuilderConfig = require('./webpack/ReactBuilder.js')
        return ReactBuilderConfig.getConfig(customConfig)

    }

    vueVite(customConfig) {
        let vueViteBuilderConfig = require('./vite/VueBuilder.js')

        return vueViteBuilderConfig.getConfig(customConfig)

    }

}

let PluginMasterInstance = new PluginMasterBuilderConfig()


module.exports = PluginMasterInstance
