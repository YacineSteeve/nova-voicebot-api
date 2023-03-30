import { signupUser } from './signup';
import { loginUser } from './login';
import { infoUser } from './info';
import { deleteUser } from './delete';

const userController = {
    signupUser,
    loginUser,
    infoUser,
    deleteUser,
};

export default userController;
