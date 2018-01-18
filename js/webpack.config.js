const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

var config = {
    devtool: isProd ? "hidden-source-map" : "source-map",

    // Read files from js/src
    context: path.resolve("./src"),
    entry: {
        rabix: "./rabix.ts"
    },

    // Output everything into the static folder
    output: {
        path: path.resolve("../static/js"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].bundle.map",
        devtoolModuleFilenameTemplate: function (info) {
            return "file:///" + info.absoluteResourcePath;
        }
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.ts?$/,
                exclude: ["node_modules"],
                use: ["awesome-typescript-loader", "source-map-loader"]
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
        extensions: [".ts", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // eslint-disable-line quote-props
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
            filename: "vendor.bundle.js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: true
        }),
        new DashboardPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};

module.exports = config;
