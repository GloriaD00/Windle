const path = require("path");

const Dotenv = require('dotenv-webpack');
module.exports={
    mode:"development",
    entry: "./src/MainScript.js",

    plugins: [
        new Dotenv(
            {
                path: './windle.env'
            }
        )
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    watch: false


}
