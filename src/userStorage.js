const USERS_KEY = "users";

function getAllUsers() {
  const savedUsers = localStorage.getItem(USERS_KEY);
  return savedUsers === null ? {} : JSON.parse(savedUsers);
}

export function userExists(userName) {
  return userName in getAllUsers();
}

export function registerUser(userName, password) {
  const users = getAllUsers();
  users[userName] = password;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function isPasswordCorrect(userName, password) {
  return getAllUsers()[userName] === password;
}