const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const entry = {
   frontpage: {
      header: "./src/frontpage/Header.jsx",
      footer: "./src/frontpage/Footer.jsx",
      home: "./src/frontpage/Home.jsx",
      register: "./src/frontpage/register/Forms.jsx",
      verify: "./src/frontpage/register/Verify.jsx",
      profile: "./src/frontpage/profile/Forms.jsx",
      login: "./src/frontpage/Login.jsx",
      about: "./src/frontpage/About.jsx",
      explorer: "./src/frontpage/Explorer.jsx",
      contact: "./src/frontpage/Contact.jsx",
      upload: "./src/frontpage/upload/Forms.jsx",
      itemdetail: "./src/frontpage/itemdetail/Detail.jsx",
      items: "./src/frontpage/items/Lists.jsx",
      creators: "./src/frontpage/creators/Lists.jsx",
      detail_creators: "./src/frontpage/creators/DetailCreators.jsx",
      edititem: "./src/frontpage/upload/EditItem.jsx",
      blog: "./src/frontpage/blog/Lists.jsx",
      blogdetail: "./src/frontpage/blog/Detail.jsx",
   },
   admin: {
      topbar: "./src/admin/Topbar.jsx",
      navigation: "./src/admin/Navigation.jsx",
      dashboard: "./src/admin/Dashboard.jsx",
      blogs: "./src/admin/blogs/Lists.jsx",
   },
};

const build = {
   frontpage: "public/bundle/frontpage",
   admin: "public/bundle/admin",
};

module.exports = (env) => {
   return {
      plugins: [
         new CleanWebpackPlugin(),
         new webpack.ProgressPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         new WebpackManifestPlugin(entry[env.PAGE]),
         new HtmlWebpackPlugin(),
      ],
      entry: entry[env.PAGE],
      output: {
         path: path.resolve(__dirname, build[env.PAGE]),
         filename: env.NODE_ENV === "development" ? "[name].js" : "[name].[hash].js",
      },
      devServer: {
         // open: true,
         clientLogLevel: "silent",
         port: 8081,
         historyApiFallback: true,
         hot: true,
         disableHostCheck: true,
         proxy: {
            "/vendor.js": {
               target: "http://localhost:8080",
               secure: false,
               changeOrigin: true,
            },
         },
      },
      resolve: {
         extensions: [".js", ".jsx"],
      },
      optimization: {
         splitChunks: {
            cacheGroups: {
               vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name: "vendor",
                  chunks: "all",
               },
            },
         },
      },
      module: {
         rules: [
            {
               test: /\.(jsx|js)$/,
               include: path.resolve(__dirname, "src/"),
               exclude: /node_modules/,
               use: [
                  {
                     loader: "babel-loader",
                     options: {
                        presets: [
                           [
                              "@babel/preset-env",
                              {
                                 targets: "defaults",
                              },
                           ],
                           "@babel/preset-react",
                        ],
                     },
                  },
               ],
            },
            {
               test: /\.svg$/,
               use: ["@svgr/webpack"],
            },
         ],
      },
   };
};
