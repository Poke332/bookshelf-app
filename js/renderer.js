import { changeCompleteStatus, removeBookItem } from "./button.js";

const RENDER_EVENT = 'render-books'

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  };
}

function makeBook(bookObject, bookArray) {

  const {id, title, author, year, isCompleted} = bookObject;

  const container = document.createElement('div');
  container.classList.add('books', 'container')
  container.setAttribute('data-bookid', `${id}`);
  container.setAttribute('data-testid', 'bookItem');

  const bookTitle = document.createElement('h3');
  bookTitle.innerText = title;
  bookTitle.setAttribute('data-testid', 'bookItemTitle');

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = `Penulis: ${author}`;
  bookAuthor.setAttribute('data-testid', 'bookItemAuthor');

  const bookYear = document.createElement('p');
  bookYear.innerText = `Tahun: ${year}`;
  bookYear.setAttribute('data-testid', 'bookItemYear');

  const buttonContainer = document.createElement('div');

  const completeButton = document.createElement('button');
  completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton')
  completeButton.addEventListener('click', function() {
    changeCompleteStatus(id, bookArray)
  });

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('data-testid', 'bookItemDeleteButton')
  deleteButton.addEventListener('click', function() {
    removeBookItem(id, bookArray)}
  );
  deleteButton.innerText = 'Delete Book';


  container.append(bookTitle, bookAuthor, bookYear, buttonContainer)
  buttonContainer.append(completeButton, deleteButton)
  
  if (isCompleted) {
    completeButton.innerText = 'Remove from Completed'
  } else {
    completeButton.innerHTML = 'Add to Completed'
  }
  return container;
}

export {
  RENDER_EVENT,
  generateId,
  generateBookObject,
  makeBook
}