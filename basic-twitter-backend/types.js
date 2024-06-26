const zod = require('zod');

const createPost = zod.object({
    content: zod.string()
})

const deletePost = zod.object({
    id: zod.string()
})

const createUser = zod.object({
    userName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),

})

const loginUser = zod.object({
    userName: zod.string(),
    password: zod.string()

})

module.exports = {
    createPost: createPost,
    deletePost: deletePost,
    createUser: createUser,
    loginUser: loginUser
}