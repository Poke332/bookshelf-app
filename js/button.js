import { saveData } from "./storage.js";
import { RENDER_EVENT } from "./renderer.js";

function findBook(targetId, bookArray) {
  for (const book of bookArray) {
    if (book.id === targetId) {
      return book;
    }
  }
  return null;
}

function findBookIndex(targetId, bookArray) {
  return bookArray.findIndex((book) => book.id === targetId);
}

function changeCompleteStatus(targetId, bookArray) {
  const bookTarget = findBook(targetId, bookArray);

  if (bookTarget == null) return;

  bookTarget.isCompleted? bookTarget.isCompleted = false : bookTarget.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(bookArray);
}

function removeBookItem(targetId, bookArray) {
  const bookTarget = findBookIndex(targetId, bookArray);

  if (bookTarget === -1) return;

  bookArray.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(bookArray);
}

export {
  changeCompleteStatus,
  removeBookItem
}