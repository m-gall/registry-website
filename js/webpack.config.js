const path = require("path");

module.exports = {
    devtool: "source-map",

    // Read files from js/src
    entry: {
        rabix: "./rabix.js"
    },

    // Output everything into the static folder
    output: {
        path: path.resolve("../static/js"),
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [require('babel-preset-env')]
                    }
                },

            },
            {
                enforce: "pre",
                test: /\.ts?$/,
                exclude: ["node_modules"],
                use: {
                    loader: "awesome-typescript-loader",
                    options: {
                        useBabel: true
                    }
                }
            },
            {test: /\.css$/, loaders: ["style-loader", "css-loader"]},
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".vue"],
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    }
};

