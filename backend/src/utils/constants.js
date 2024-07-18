const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000 ; //1h

const BCRYPT_SALT = 10;
const MAX_LOGIN_ATTEMPTS = 4;

const USERS = {
    ADMIN: "Admin",
    CUSTOMER: "Customer",
};

const FILE_STORAGE_PATH = {
    sneakerImages: "product/images/",
    userAvatars: "users/avatars/",
};

module.exports = {
    COOKIE_MAX_AGE,
    USERS,
    BCRYPT_SALT,
    FILE_STORAGE_PATH,
    MAX_LOGIN_ATTEMPTS,
};
