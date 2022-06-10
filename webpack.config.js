const path = require("path");

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      type: "module",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: ["rxjs", "rxjs/operators", "react"],
  experiments: {
    outputModule: true,
  },
  externalsType: "module",
};

