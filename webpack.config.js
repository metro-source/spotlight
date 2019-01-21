const path = require("path");

module.exports = {
    mode: "development",
    entry: "./frontend/index.js",
    
    output: {
        path: path.resolve(__dirname, "public", "dist"),
        filename: "app.js",
        publicPath: "/dist/"
    },

    devServer: {
        contentBase: "./public",

        proxy: {
            "/api" : "http://localhost:5000"
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            }
        ]
    }
}