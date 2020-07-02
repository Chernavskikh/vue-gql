// A map of functions which return data for the schema.

module.exports = {
    Query: {
        getUser: () => null,
        getPosts: async (_, args, { Post }) => {
            const posts = await Post.find({}).sort({ createdDate: 'desc' }).populate({
                path: 'createdBy',
                model: 'User',
            });

            return posts;
        }
    },
    Mutation: {
        // { Post } => Post model
        addPost: async (_, { title, imageUrl, categories, description, creatorId }, { Post }) => {
            const newPost = await new Post({
                title,
                imageUrl,
                categories,
                description,
                createdBy: creatorId,
            }).save();

            return newPost;
        },
        signupUser: async (_, { username, email, password }, { User }, info) => {
            const user = await User.findOne({ username: username });

            if (user) {
                throw new Error('user already exists');
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return newUser;
        }
    }
};
