const z = require('zod');

const userSchema = z.object({
	name: z.object({
		firstname: z
			.string({
				required_error: 'Firstname is required',
				invalid_type_error: 'Firstname must be a string',
			})
			.min(3, 'Firstname must be at least 3 characters long'),
		lastname: z
			.string({
				required_error: 'Lastname is required',
				invalid_type_error: 'Lastname must be a string',
			})
			.min(3, 'Lastname must be at least 3 characters long'),
	}),
	email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Email must be a string',
		})
		.email('Invalid email address'),
	phone: z
		.string({
			invalid_type_error: 'Phone number must be a string',
		})
		.optional(),
	username: z
		.string({
			required_error: 'Username is required',
			invalid_type_error: 'Username must be a string',
		})
		.min(6, 'Username must be at least 6 characters long'),
	avatar: z
		.string({
			required_error: 'Avatar is required',
			invalid_type_error: 'Avatar must be a string',
		})
		.url('Invalid URL format'),
	password: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Password must be a string',
		})
		.min(6, 'Password must be at least 6 characters long'),
	about: z
		.string({
			invalid_type_error: 'About must be a string',
		})
		.optional(),
	address: z
		.object({
			city: z.string({
				required_error: 'City is required',
				invalid_type_error: 'City must be a string',
			}),
			number: z
				.number({
					required_error: 'Number is required',
					invalid_type_error: 'Number must be a number',
				})
				.int('Number must be an integer'),
			street: z.string({
				required_error: 'Street is required',
				invalid_type_error: 'Street must be a string',
			}),
			zipcode: z
				.number({
					required_error: 'Zipcode is required',
					invalid_type_error: 'Zipcode must be a number',
				})
				.int('Zipcode must be an integer'),
		})
		.optional(),
	created_at: z.date().default(() => new Date()),
	updated_at: z.date().default(() => new Date()),
});

//safeParse devuelve un objeto con un error si no se cumple el schema, y
//si se cumple, devuelve un booleano.
function validateUser(user) {
	return userSchema.safeParse(user);
}

//el partial es para cuando se quiera actualizar solo una parte del objeto,
//hace que todas las propiedades sean opcionales
function validateUserPartial(user) {
	return userSchema.partial().safeParse(user);
}

module.exports = {
	validateUser,
	validateUserPartial,
};
