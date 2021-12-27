/*
* generate configuration for webpack
*/

const path = require('path');

const basePath = __dirname + '/../../';

let compile = {
    mode: 'development',
    devServer: {
        contentBase: path.join(basePath, "assets"),
        compress: false,
        port: 8080,
        hot: true,
        host: 'localhost'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
};


class PluginMasterReactConfig {

    webpackConfig = [];

    constructor(compileConfig, basePath) {
        this.compileConfig = compileConfig;
        this.basePath = basePath;
    }

    getConfig(customConfig) {

        customConfig.forEach(item => {

            let fileName = item.outputFileName.split(".")[0];

            let configEntry = {};

            configEntry[fileName] = this.basePath + item.source;

            this.compileConfig['entry'] = configEntry;

            this.compileConfig['output'] = {
                "filename": '[name].js',
                "path": this.basePath + item.outputDir,
                publicPath: this.basePath + 'assets/'
            };

            this.webpackConfig.push(this.compileConfig)
        });

        return this.webpackConfig;
    }

}

module.exports = new PluginMasterReactConfig(compile, basePath)
