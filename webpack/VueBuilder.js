
/*
* generate configuration for webpack
*/

const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const basePath = __dirname + '/../../';

let  compile = {
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
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
	 resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
};



class PluginMasterVueConfig {

    webpackConfig = [];

    constructor(compileConfig, basePath) {
        this.compileConfig = compileConfig;
        this.basePath = basePath;
    }

    getConfig(customConfig){

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

module.exports = new PluginMasterVueConfig(compile, basePath)
