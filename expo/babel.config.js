module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// Required for expo-router
			"@babel/plugin-proposal-export-namespace-from",
			"react-native-reanimated/plugin",
			[
				"module-resolver",
				{
					root: [".."],
					alias: {
						"@shared": "../shared",
					},
					extensions: [".tsx", ".ts", ".js", ".json"],
				},
			],
		],
	}
}
