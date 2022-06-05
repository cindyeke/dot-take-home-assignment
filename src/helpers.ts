import { db } from "./db";

type User = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  password: string;
};

export const convertFirstLetterToUpperCase = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const isUsernameValid = (users: User[], username: string): boolean =>
  users.findIndex((user: User) => user.username === username) === -1;

export const suggestUsernames = (username: string): string => {
  const usernameSuggestions: any[] = [];
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
    convertFirstLetterToUpperCase(username),
    new Date().getFullYear(),
  ];

  SUFFIX.forEach((suffix) => usernameSuggestions.push(`${username}${suffix}`));

  return String(usernameSuggestions.sort());
};

export const checkIfUsernameHasRestrictedWord = (username: string): any => {
  const match = db.restrictedWords.find((word) => {
    if (username.includes(word)) {
      return true;
    }
  });

  return match;
};

export const checkUsername = (users: User[], username: string): any => {
  const containedRestrictedWord = checkIfUsernameHasRestrictedWord(username);

  if (containedRestrictedWord) {
    const filteredUsername = username.replace(containedRestrictedWord, "");

    if (!isUsernameValid(users, filteredUsername)) {
     return suggestUsernames(filteredUsername)
    }

  } else {
    if (!isUsernameValid(users, username)) {
        return suggestUsernames(username)
    }
  }
};
