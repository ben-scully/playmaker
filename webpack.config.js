module.exports = {
    entry: "./js/script.js",
    output: {
        path: __dirname,
        filename: "./js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
}
