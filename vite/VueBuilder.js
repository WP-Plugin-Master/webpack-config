
let {defineConfig} = require("vite")

let vue = require("@vitejs/plugin-vue")

let path = require('path');
let liveReload = require('vite-plugin-live-reload');


const basePath = __dirname + '/../../../';

const config = {
    plugins: [
      vue()
    ],
    // config
    root: basePath,
    base: '/',

    build: {
        // output dir for production build
        outDir: '',
        emptyOutDir: true,

        // emit manifest so PHP can find the hashed files
        manifest: true,

        // esbuild target
        target: 'es2018',

        // our entry
        rollupOptions: {},
    },

    server: {
        fs: {
            strict: false,
        },
        // required to load scripts from custom host
        cors: true,

        // we need a strict port to match on PHP side
        // change freely, but update on PHP to match the same port
        strictPort: true,
        port: 3000
    },

    // required for in-browser template compilation
    // https://v3.vuejs.org/guide/installation.html#with-a-bundler
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    }
}


class PluginMasterVueConfig {

    constructor(config, basePath, liveReload) {
        this.viteConfig = config;
        this.basePath = basePath;
        this.liveReload = liveReload;
    }

    getConfig(customConfig) {

        let rollupOptions = {
            input: {},
            output: {
                entryFileNames: customConfig.outputDir + `assets/[name].js`,
                chunkFileNames: customConfig.outputDir + `assets/[name].js`,
                assetFileNames: customConfig.outputDir + `assets/[name].[ext]`
            }
        }
        let liveReloadDirs = [];
        if(customConfig.liveReloadDir){
            liveReloadDirs = Array.isArray(customConfig.liveReloadDir) ? customConfig.liveReloadDir : (typeof customConfig.liveReloadDir === 'string' ? [customConfig.liveReloadDir] : [])
        }

        customConfig.input.forEach(item => {
            let fileName = item.outputFileName.split(".")[0];
            rollupOptions.input[fileName] = item.source
            if(!liveReloadDirs.length){
                let splitSOurce = item.source.split('/')
                    splitSOurce.splice(-1)
                liveReloadDirs.push(splitSOurce.join('/'))
            }
        });
       // let livereloadObject  = this.liveReload(liveReloadDirs);
       // this.viteConfig.plugins.push(livereloadObject)
        this.viteConfig.rollupOptions  = rollupOptions
        this.viteConfig.build.output  = this.basePath+customConfig.outputDir
        if(customConfig.port){
            this.viteConfig.server.port = customConfig.port
        }
     console.log( this.viteConfig )
        return this.viteConfig;
    }

}


module.exports = defineConfig( new PluginMasterVueConfig(config, basePath, liveReload) )
