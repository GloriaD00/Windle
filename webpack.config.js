const path = require("path");
module.exports={
    mode:"development",
   entry: "./src/MainScript.js",


    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    watch: true
}