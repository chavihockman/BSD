
function getStorageKey(userName, fileName) {
  return `${userName}::${fileName}`;
}


export function saveFile(userName, fileName, characters) {
  localStorage.setItem(getStorageKey(userName, fileName), JSON.stringify(characters));
}


export function loadFile(userName, fileName) {
  const savedText = localStorage.getItem(getStorageKey(userName, fileName));
  if (savedText === null) return null;
  return JSON.parse(savedText);
}


export function fileExists(userName, fileName) {
  return localStorage.getItem(getStorageKey(userName, fileName)) !== null;
}


export function deleteFile(userName, fileName) {
  localStorage.removeItem(getStorageKey(userName, fileName));
}