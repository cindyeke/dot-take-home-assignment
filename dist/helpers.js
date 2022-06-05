"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsername = exports.checkIfUsernameHasRestrictedWord = exports.suggestUsernames = exports.isUsernameValid = exports.convertFirstLetterToUpperCase = void 0;
const db_1 = require("./db");
const convertFirstLetterToUpperCase = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
exports.convertFirstLetterToUpperCase = convertFirstLetterToUpperCase;
const isUsernameValid = (users, username) => users.findIndex((user) => user.username === username) === -1;
exports.isUsernameValid = isUsernameValid;
const suggestUsernames = (username) => {
    const usernameSuggestions = [];
    // tslint:disable-next-line:no-console
    console.log();
    const SUFFIX = [
        "1",
        "2",
        "3",
        "_",
        "101",
        "007",
        "5",
        "90",
        "4",
        (0, exports.convertFirstLetterToUpperCase)(username),
        new Date().getFullYear(),
    ];
    SUFFIX.forEach((suffix) => usernameSuggestions.push(`${username}${suffix}`));
    return String(usernameSuggestions.sort());
};
exports.suggestUsernames = suggestUsernames;
const checkIfUsernameHasRestrictedWord = (username) => {
    const match = db_1.db.restrictedWords.find((word) => {
        if (username.includes(word)) {
            return true;
        }
    });
    return match;
};
exports.checkIfUsernameHasRestrictedWord = checkIfUsernameHasRestrictedWord;
const checkUsername = (users, username) => {
    const containedRestrictedWord = (0, exports.checkIfUsernameHasRestrictedWord)(username);
    if (containedRestrictedWord) {
        const filteredUsername = username.replace(containedRestrictedWord, "");
        if (!(0, exports.isUsernameValid)(users, filteredUsername)) {
            return (0, exports.suggestUsernames)(filteredUsername);
        }
    }
    else {
        if (!(0, exports.isUsernameValid)(users, username)) {
            return (0, exports.suggestUsernames)(username);
        }
    }
};
exports.checkUsername = checkUsername;
//# sourceMappingURL=helpers.js.map