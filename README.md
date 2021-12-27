 
let builder = require("plugin-master-js-build")


let settings = {
            port: '',
            outputDir: '',
            input: [
                {
                    source: '',
                    outputFileName: '',
                }
            ],
        }


module.exports = builder.vueVite(settings);

