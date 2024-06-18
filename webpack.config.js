const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    slider: "./src/scripts/slider.js",
    liveBackground: "./src/scripts/liveBackground.js",
    typer: "./src/scripts/typer.js",
    about: "./src/about.js",
    tech: "./src/tech.js",
    business: "./src/business.js",
    science: "./src/science.js",
    health: "./src/health.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "./images/[hash][ext][query]", // Ensure correct path for images
    clean: true, // Cleans the output directory before each build
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["slider", "liveBackground", "typer", "index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
      chunks: ["about"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/tech.html",
      filename: "tech.html",
      chunks: ["slider", "liveBackground", "typer", "tech"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/business.html",
      filename: "business.html",
      chunks: ["slider", "liveBackground", "typer", "business"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/science.html",
      filename: "science.html",
      chunks: ["slider", "liveBackground", "typer", "science"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/health.html",
      filename: "health.html",
      chunks: ["slider", "liveBackground", "typer", "health"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]", // Define asset output path
        },
      },
      {
        test: /\.ttf$/,
        use: ["url-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true, // Allows index.html to be served for any 404 routes
  },
};

// module.exports = {
//   entry: {
//     index: "./src/index.js",
//     about: "./src/about/about.js",
//     liveBackground: "./src/scripts/liveBackground.js",
//     slider: "./src/scripts/slider.js",
//     typer: "./src/scripts/typer.js",
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].bundle.js",
//     assetModuleFilename: "images/[hash][ext][query]",
//   },
//   plugins: [
//     new Dotenv(),
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       filename: "index.html",
//       chunks: ["index"],
//     }),
//     new HtmlWebpackPlugin({
//       template: "./src/about/about.html",
//       filename: "about.html",
//       chunks: ["about"],
//     }),
//     // Add more HtmlWebpackPlugin instances for other HTML files if needed
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env"],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         type: "asset/resource",
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "dist"),
//     },
//     compress: true,
//     port: 9000,
//     open: true,
//     historyApiFallback: true, // Enable this if using client-side routing
//   },
// };

// const Dotenv = require("dotenv-webpack");
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
//   plugins: [
//     new Dotenv(),
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       filename: "index.html",
//     }),
//     new HtmlWebpackPlugin({
//       template: "./src/about/about.html", // Adjusted template path for the about page
//       filename: "about.html", // Output HTML file name for the about page
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env"],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         use: [
//           {
//             loader: "file-loader",
//           },
//         ],
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "dist"),
//     },
//     compress: true,
//     port: 9000,
//     historyApiFallback: true, // Add this line
//   },
// };
