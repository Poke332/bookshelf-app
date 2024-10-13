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

function searchBookshelf(searchTitle) {
  const incompleteList = document.getElementById('incompleteBookList');
  const completedList = document.getElementById('completeBookList');

  incompleteList.innerHTML = '';
  completedList.innerHTML = '';

  const searched = books.filter((book) => {
    const bookTitle = book.title.toLowerCase();
    return bookTitle.includes(searchTitle.toLowerCase());
  });

  for (const bookItem of searched) {
    const bookElement = makeBook(bookItem, books, RENDER_EVENT);
    if (bookItem.isCompleted) {
      completedList.append(bookElement);
    } else {
      incompleteList.append(bookElement);
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const submitForm = document.getElementById('bookForm')
  const submitSearchForm = document.getElementById('searchBook')

  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataStorage(books, RENDER_EVENT)
  }

  submitSearchForm.addEventListener('submit', (event) => {
    const searchTitle = document.getElementById('searchBookTitle').value;
    event.preventDefault();
    searchBookshelf(searchTitle);
  })
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
    const bookElement = makeBook(bookItem, books);
    if (bookItem.isCompleted) {
      completedList.append(bookElement);
    } else {
      incompleteList.append(bookElement);
    }
  }
})