const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
	devtool: 'hidden-source-map', // 'hidden-nosources-source-map', //'hidden-source-map', // source-map, 'source-map', // 
	entry: {
	  "background": ["./src/background/index.js"],
	  "content_scripts": ["./src/content_scripts/index.js"],
	  "options": ["./src/options/scripts/index.js", "./src/options/styles/options.scss"],
	  "popup": ["./src/popup/scripts/index.js", "./src/popup/styles/popup.scss"],
	  "newtab": ["./src/newtab/scripts/index.js", "./src/newtab/styles/newtab.scss"],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		publicPath: '',
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].css",
						}
					},
					{
						loader: "extract-loader"
					},
					{
						loader: "css-loader?-url"
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: "sass-loader",
						options: {
              // Prefer `dart-sass`
							implementation: require.resolve("sass"),
							sourceMap: true,
            },
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-transform-runtime"]
						}
				}
			},
			{
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
		]
	},
	plugins: [
		// https://www.npmjs.com/package/npm-install-webpack-plugin
		//new NpmInstallPlugin({dev: true, peerDependencies: true, quiet: false, npm: 'pnpm'		}),
		// new webpack.SourceMapDevToolPlugin({			 filename: '[name].map',		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/manifest.json" },
				{ from: "./src/options/options.html" },
				{ from: "./src/popup/popup.html" },
				{ from: "./src/newtab/newtab.html" },
				{ from: "icons/*", to: path.resolve(__dirname, "dist"), context: "src/" }
			]
		}),
	]
};
