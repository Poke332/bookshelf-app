const STORAGE_KEY = 'BOOKS_LIST'
const SAVED_EVENT = 'save-books'

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData(data) {
  if (isStorageExist()) {
    const parsed = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataStorage(bookArray, RENDER_EVENT) {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const loadedData = JSON.parse(serializedData);

  if (loadedData !== null) {
    for (const book of loadedData) {
      bookArray.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

export {
  STORAGE_KEY,
  SAVED_EVENT,
  isStorageExist,
  saveData,
  loadDataStorage
}