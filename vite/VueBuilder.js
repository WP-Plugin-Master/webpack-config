import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import liveReload from 'vite-plugin-live-reload'


const basePath = __dirname + '/../../';

const config = defineConfig({
    plugins: [
        vue()
    ],
    // config
    root: basePath,
    base: '/',

    build: {
        // output dir for production build
        outDir: basePath,
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
})


class PluginMasterVueConfig {

    constructor(config, basePath) {
        this.viteConfig = config;
        this.basePath = basePath;
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

        customConfig.input.forEach(item => {
            let fileName = item.outputFileName.split(".")[0];
            rollupOptions.input[fileName] = item.source
        });

        this.viteConfig.plugins.push(liveReload(customConfig.livereloadDir))  = rollupOptions
        this.viteConfig.rollupOptions  = rollupOptions
        return this.viteConfig;
    }

}


module.exports = new PluginMasterVueConfig(config, basePath)
