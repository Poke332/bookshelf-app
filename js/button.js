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

  bookTarget.isComplete? bookTarget.isComplete = false : bookTarget.isComplete = true;

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

function makeEditMenu(targetId, bookArray) {
  const editMenuContainer  = document.createElement('div');
  editMenuContainer.classList.add('edit-menu', 'container');

  const editForm = document.createElement('form');

  const editTitle = document.createElement('input');
  editTitle.classList.add('field', 'editTitle')
  editTitle.setAttribute('type', 'text');
  editTitle.setAttribute('required', '');
  editTitle.setAttribute('placeholder', 'Insert new Title, ex: Harry Potter');

  const editAuthor = document.createElement('input');
  editAuthor.classList.add('field', 'editAuthor')
  editAuthor.setAttribute('type', 'text');
  editAuthor.setAttribute('required', '');
  editAuthor.setAttribute('placeholder', 'Insert new Title, ex: J.K Rowling');

  const editYear = document.createElement('input');
  editYear.classList.add('field', 'editYear')
  editYear.setAttribute('type', 'number');
  editYear.setAttribute('required', '');
  editYear.setAttribute('placeholder', 'Insert new Year, ex: 1998');

  const submitEditButton = document.createElement('button')
  submitEditButton.setAttribute('type', 'submit')
  submitEditButton.innerText = 'Save Changes'

  editForm.addEventListener('submit',  (event) => {
    event.preventDefault();
    editExistingBook(targetId, bookArray);
  });

  const cancelEditButton = document.createElement('button')
  cancelEditButton.innerText = 'Discard Changes'
  cancelEditButton.addEventListener('click', () => {
    editMenuContainer.remove();
  })

  document.body.append(editMenuContainer);
  editMenuContainer.append(editForm);
  editForm.append(editTitle, editAuthor, editYear,  submitEditButton, cancelEditButton);
}

function editExistingBook(targetId, bookArray) {
  const bookTarget = findBook(targetId, bookArray)
  const editMenuContainer = document.querySelector('.edit-menu')

  bookTarget.title = document.querySelector('.editTitle').value;
  bookTarget.author = document.querySelector('.editAuthor').value;
  bookTarget.year = document.querySelector('.editYear').value

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(bookArray);
  editMenuContainer.remove();
}

export {
  changeCompleteStatus,
  removeBookItem,
  makeEditMenu
}