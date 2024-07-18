const { COOKIE_MAX_AGE, USERS } = require("./constants");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");

const sendCookie = (res, token, maxAge) => {
    const isDevelopment = process.env.NODE_ENV === "development";

    res.cookie("TAST", token, {
        httpOnly: true,
        maxAge: maxAge ? maxAge : COOKIE_MAX_AGE,
        secure: isDevelopment ? false : true,
    });
};

const createToken = (user, userType) => {
    const payload = { _id: user._id, type: userType };

    return JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h", //removing that, means the token does not expire
    });
};

const routeErrors = (res, error, msg) => {
    if (error?.code === 11000) {
        return res.status(400).send("Email already exists.");
    } else if (error?.message) {
        return res.status(401).send(error.message);
    } else {
        return res.status(401).send(msg);
    }
};

const isValidDocument = async (res, ids) => {
    for (const id in ids) {
        //check if the document exists in the collection
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(406).send(`${id} does not exist.`);
    }
};

const documentExists = async (res, itemId, document) => {
    try {
        //check if the document exists in the collection
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(406).send(`${itemId} does not exist.`);
        }

        if (document) {
            const exists = await document.findOne({ _id: itemId });
            if (!exists) {
                return res.status(406).send(`${itemId} does not exist`);
            }
            return await exists; //return the document
        }
    } catch (error) {
        routeErrors(res, error, "Unable to find the information in our system.");
    }
};

module.exports = {
    sendCookie,
    createToken,
    routeErrors,
    isValidDocument,
    documentExists,
};
