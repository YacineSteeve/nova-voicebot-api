import { createUser } from './create';
import { getUser } from './get';
import { getUserByToken } from './get-by-token';
import { deleteUser } from './delete';

const userService = {
    createUser,
    getUser,
    getUserByToken,
    deleteUser,
};

export default userService;
