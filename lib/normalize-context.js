
exports = module.exports = function (include, exclude) {
	if (!exclude.length) {
		if (!include.length) {
			return null;
		}

		return {
			include: include
		};
	}

	if (!include.length) {
		return {
			exclude: exclude
		};
	}

	return {
		include: include,
		exclude: exclude
	};
};
