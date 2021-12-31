let path = require('path');

const basePath = __dirname + path.sep + '..' + path.sep + '..' + path.sep + '..' + path.sep;

const config = {
    plugins: [],
    build: {
        emptyOutDir: true,
        manifest: true, 
        rollupOptions: {
            input: {},
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        },
    },

    server: {
        fs: {
            strict: false,
        },
        hmr: {
            protocol: 'ws',
            host: 'localhost'
        },
        port: 3000
    },
    resolve: {
        alias: {}
    }
}


class PluginMasterVueConfig {

    constructor(config, basePath) {
        this.viteConfig = config;
        this.basePath = basePath;
    }

    getConfig(customConfig) {

        let rollupInput = {}

        customConfig.input.forEach(item => {
            let fileName = item.outputFileName.split(".")[0];
            rollupInput[fileName] = item.source
        });

        this.viteConfig.plugins = customConfig.plugins
        this.viteConfig.build.rollupOptions.input = rollupInput
        this.viteConfig.build.outDir = path.join(this.basePath, customConfig.outputDir)
        if (customConfig.alias) {
            this.viteConfig.resolve.alias = customConfig.alias
        }

        if (customConfig.port) {
            this.viteConfig.server.port = customConfig.port
        }

        return this.viteConfig;
    }

}


module.exports = new PluginMasterVueConfig(config, basePath)
