const z = require('zod');

const bookmarkSchema = z.object({
	user: z.string({
		required_error: 'User is required',
		invalid_type_error: 'User must be a string',
	}),
	post: z.string({
		required_error: 'Post is required',
		invalid_type_error: 'Post must be a string',
	}),
	created_at: z.date().default(() => new Date()),
});

//safeParse devuelve un objeto con un error si no se cumple el schema, y
//si se cumple, devuelve un booleano.
function validateBookmark(bookmark) {
	return bookmarkSchema.safeParse(bookmark);
}

module.exports = {
	validateBookmark,
};
