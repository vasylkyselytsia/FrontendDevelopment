const fs = require("fs"),
    path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    extractLESS = new ExtractTextPlugin({filename: "css/style_vendor.[hash].css", allChunks: false}),
    extractSASS = new ExtractTextPlugin({filename: "css/style_bundle.[hash].css", allChunks: true}),
    OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = function Compile(env) {
    env = env || "development";
    return {
        entry: {
            main: ["babel-polyfill", "./frontend/app.js", "./frontend/index.scss"],
            vendor: ['jquery', 'angular', "bootstrap/dist/js/bootstrap.min.js", "bootstrap/less/bootstrap.less",
                "angular-ui-bootstrap", "moment"]
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
                    loaders: ["babel-loader"],
                    include: [
                        path.resolve(__dirname, "frontend")
                    ],
                    test: /\.js$/
                },
                {
                    test: /\.scss$/,
                    loader: extractSASS.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                },
                {
                    test: /\.less$/,
                    loader: extractLESS.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    })
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)(\?[a-z0-9]+)?$/,
                    loader: "file-loader"
                },
                {
                    test: /\.json$/,
                    loader: "json-loader"
                }
            ]
        },
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.ProvidePlugin({$: 'jquery', "jQuery": "jquery", "window.jQuery": "jquery"}),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            extractLESS,
            extractSASS,
            new OptimizeCssAssetsPlugin({
                cssProcessor: require("cssnano"),
                cssProcessorOptions: {discardComments: {removeAll: true}}
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: env !== "production",
                    drop_console: env === "production",
                    unsafe: true
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'js/vendor.[hash].js',
                minChunks: Infinity
            }),
            function () {
                this.plugin("done", function (stats) {
                    const replaceInJsFile = function (filePath, toReplace, replacement, kw = "bundle") {
                        const replacer = function (match) {
                            console.log('Replacing in %s: %s => %s', filePath, match, replacement);
                            return replacement;
                        };
                        const str = fs.readFileSync(filePath, "utf8");
                        const out = str.replace(new RegExp(`${kw}\\.?(.+)?\.js`, "gi"), replacer);
                        fs.writeFileSync(filePath, out);
                    };

                    const replaceInCssFile = function (filePath, toReplace, replacement, kw = "style_bundle") {
                        const replacer = function (match) {
                            console.log('Replacing in %s: %s => %s', filePath, match, replacement);
                            return replacement;
                        };
                        const str = fs.readFileSync(filePath, "utf8");
                        const out = str.replace(new RegExp(`${kw}\\.?(.+)?\.css`, "gi"), replacer);
                        fs.writeFileSync(filePath, out);
                    };

                    const hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.

                    replaceInJsFile(path.resolve("./templates/", "index.html"),
                        "bundle.js",
                        "bundle." + hash + ".js"
                    );
                    replaceInJsFile(path.resolve("./templates/", "index.html"),
                        "vendor.js",
                        "vendor." + hash + ".js",
                        "vendor"
                    );
                    replaceInCssFile(path.resolve("./templates/", "index.html"),
                        "bundle.css",
                        "bundle." + hash + ".css"
                    );
                    replaceInCssFile(path.resolve("./templates/", "index.html"),
                        "vendor.css",
                        "vendor." + hash + ".css",
                        "style_vendor"
                    );

                });
            }
        ],
        devtool: env === "development" ? "eval" : false,
        watch: env === "development"
    };
};
