const fs = require("fs"),
    path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = function Compile(env) {
    env = env || "dev";
    return {
        entry: {
            main: ["babel-polyfill", "./frontend/app.js", "./frontend/index.scss"],
            vendor: ['jquery', 'angular', "bootstrap", "angular-ui-bootstrap", "moment"]
        },
        output: {
            path: path.resolve("CarSale/static/base/"),
            publicPath: "/static/base/",
            filename: "js/bundle.[hash].js"
        },
        externals: {
            "angular": "angular",
            "jquery": "jQuery",
            "uibootstrap": "'ui.bootstrap'",
            "moment": "moment"
        },
        resolve: {
            alias: {}
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loaders: ["babel-loader"],
                    include: /frontend/,
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loader: "json-loader"
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style", "css!sass")
                }
            ]
        },
        watch: false,
        plugins: [
            new ExtractTextPlugin("/css/bundle.[hash].css", {
                allChunks: true
            }),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true,
                    drop_console: env === "production",
                    unsafe: true
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),

            function () {
                this.plugin("done", function (stats) {
                    const replaceInJsFile = function (filePath, toReplace, replacement) {
                        const replacer = function (match) {
                            console.log('Replacing in %s: %s => %s', filePath, match, replacement);
                            return replacement;
                        };
                        const str = fs.readFileSync(filePath, "utf8");
                        const out = str.replace(/main\.?(.+)?\.js/gi, replacer);
                        fs.writeFileSync(filePath, out);
                    };

                    const replaceInCssFile = function (filePath, toReplace, replacement) {
                        const replacer = function (match) {
                            console.log('Replacing in %s: %s => %s', filePath, match, replacement);
                            return replacement;
                        };
                        const str = fs.readFileSync(filePath, "utf8");
                        const out = str.replace(/bundle\.?(.+)?\.css/gi, replacer);
                        fs.writeFileSync(filePath, out);
                    };

                    const hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.


                    replaceInJsFile(path.resolve("./templates/", "index.html"),
                        "bundle.js",
                        "bundle." + hash + ".js"
                    );
                    replaceInCssFile(path.resolve("./templates/", "index.html"),
                        "bundle.css",
                        "bundle." + hash + ".css"
                    );

                });
            }
        ],
        devtool: env === "dev" ? "eval" : false
    };
};
