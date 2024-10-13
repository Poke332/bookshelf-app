import { SAVED_EVENT, isStorageExist, loadDataStorage, saveData} from './storage.js';
import { RENDER_EVENT, generateId, generateBookObject, makeBook} from './renderer.js';

const books = [];

function addBook() {
  const bookTitle = document.getElementById('bookFormTitle').value;
  const bookAuthor = document.getElementById('bookFormAuthor').value;
  const bookYear = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const generatedID = generateId();
  const todoObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, isComplete);
  books.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(books);
};


document.addEventListener('DOMContentLoaded', function() {
  const submitForm = document.getElementById('bookForm')

  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataStorage(books, RENDER_EVENT)
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log("Bookshelf data saved!");
});

document.addEventListener(RENDER_EVENT, () => {
  const incompleteList = document.getElementById('incompleteBookList');
  const completedList = document.getElementById('completeBookList');

  incompleteList.innerHTML = '';
  completedList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem, books, RENDER_EVENT);
    if (bookItem.isCompleted) {
      completedList.append(bookElement);
    } else {
      incompleteList.append(bookElement);
    }
  }
})