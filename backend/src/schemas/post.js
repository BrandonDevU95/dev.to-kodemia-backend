const z = require('zod');

const postSchema = z.object({
	author: z
		.string({
			required_error: 'Author is required',
			invalid_type_error: 'Author must be a string',
		})
		.optional(),
	category: z.string({
		required_error: 'Category is required',
		invalid_type_error: 'Category must be a string',
	}),
	description: z
		.string({
			required_error: 'Description is required',
			invalid_type_error: 'Description must be a string',
		})
		.min(10, 'Description must be at least 10 characters long'),
	image: z
		.string({
			required_error: 'Image is required',
			invalid_type_error: 'Image must be a string',
		})
		.url('Invalid URL format'),
	numComments: z
		.number({
			invalid_type_error: 'Number of comments must be a number',
		})
		.int()
		.default(0),
	numReactions: z
		.number({
			invalid_type_error: 'Number of reactions must be a number',
		})
		.int()
		.default(0),
	relevant: z.boolean().default(false),
	tags: z
		.array(
			z.string({
				invalid_type_error: 'Each tag must be a string',
			})
		)
		.optional(),
	readingTime: z
		.string({
			invalid_type_error: 'Reading time must be a string',
		})
		.optional(),
	title: z.string({
		required_error: 'Title is required',
		invalid_type_error: 'Title must be a string',
	}),
	updated_at: z.date().default(() => new Date()),
	created_at: z.date().default(() => new Date()),
});

//safeParse devuelve un objeto con un error si no se cumple el schema, y
//si se cumple, devuelve un booleano.
function validatePost(post) {
	return postSchema.safeParse(post);
}

//el partial es para cuando se quiera actualizar solo una parte del objeto,
//hace que todas las propiedades sean opcionales
function validatePostPartial(post) {
	return postSchema.partial().safeParse(post);
}

module.exports = {
	validatePost,
	validatePostPartial,
};
