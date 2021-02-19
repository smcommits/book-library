const books = [];
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.changeStatus = function () {
  this.readStatus = !(this.readStatus);
};

let storageItems = window.localStorage.getItem('books');
storageItems = JSON.parse(storageItems);
if (storageItems) {
  storageItems.forEach(book => {
    const newBook = new Book(book.title, book.author, book.readStatus, book.readStatus);
    books.push(newBook);
  });
}

function elementAttributes(element, id, name, type, placeholder = '') {
  element.setAttribute('id', id);
  element.setAttribute('name', name);
  element.setAttribute('type', type);
  element.setAttribute('placeholder', placeholder);
}

function createForm() {
  const form = document.createElement('tr');
  form.setAttribute('id', 'newRecord');
  const inputTitle = document.createElement('input');
  elementAttributes(inputTitle, 'title', 'title', 'text', "Book's title");
  const inputAuthor = document.createElement('input');
  elementAttributes(inputAuthor, 'author', 'author', 'text', "Author's name");
  const inputPages = document.createElement('input');
  elementAttributes(inputPages, 'pages', 'pages', 'text', "Book's pages");
  const inputReadStatus = document.createElement('input');
  elementAttributes(inputReadStatus, 'read', 'read', 'checkbox');
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Add Book';
  elementAttributes(submitButton, 'addRecord', 'addRecord', 'submit');
  const inputs = [inputTitle, inputAuthor, inputPages, inputReadStatus, submitButton];
  for (let i = 0; i < inputs.length; i += 1) {
    const tableData = document.createElement('td');
    tableData.appendChild(inputs[i]);
    form.append(tableData);
  }
  const table = document.getElementById('table');
  table.appendChild(form);
}

function stringifyReadStatus(readStatus) {
  if (readStatus) {
    return 'Book Read';
  }

  return 'Unread';
}

function displayBook(book) {
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('id', `book-${books.indexOf(book)}`);
  const bookTitle = document.createElement('td');
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement('td');
  bookAuthor.textContent = book.author;
  const bookPages = document.createElement('td');
  bookPages.textContent = book.pages;
  const readStatus = document.createElement('td');
  readStatus.setAttribute('id', `status${books.indexOf(book)}`);
  readStatus.textContent = stringifyReadStatus(book.readStatus);
  const buttonTd = document.createElement('td');
  const buttonContainer = document.createElement('div');
  const readButton = document.createElement('button');
  readButton.textContent = 'Read';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Delete';
  removeButton.setAttribute('data-attribute', books.indexOf(book).toString());
  removeButton.setAttribute('id', 'deleteBooks');

  removeButton.addEventListener('click', () => {
    books.splice(Number(removeButton.getAttribute('data-attribute')), 1);
    removeButton.parentNode.parentNode.parentNode.remove();
    const stringifyBooks = JSON.stringify(books);
    window.localStorage.setItem('books', stringifyBooks);
  });

  readButton.addEventListener('click', () => {
    const statusField = document.getElementById(`status${removeButton.getAttribute('data-attribute')}`);
    book.changeStatus();
    statusField.textContent = stringifyReadStatus(book.readStatus);
  });

  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);
  buttonTd.appendChild(buttonContainer);

  const bookRecords = [bookTitle, bookAuthor, bookPages, readStatus, buttonTd];
  for (let i = 0; i < bookRecords.length; i += 1) {
    tableRow.appendChild(bookRecords[i]);
  }

  const table = document.getElementById('table');
  table.appendChild(tableRow);
}

function hideButton() {
  const addBookButton = document.getElementById('addBook');
  addBookButton.classList.toggle('hidden');
}

function listBooks(books) {
  books.forEach(book => displayBook(book));
}
function createBook() {
  const inputTitle = document.getElementById('title');
  const inputAuthor = document.getElementById('author');
  const inputPages = document.getElementById('pages');
  const inputReadStatus = document.getElementById('read');
  const newBook = new Book(inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputReadStatus.checked);
  books.push(newBook);
  const stringifyBooks = JSON.stringify(books);
  window.localStorage.setItem('books', stringifyBooks);
}

function destroyForm() {
  const form = document.getElementById('newRecord');
  form.remove();
}

function submitForm() {
  const submitButton = document.getElementById('addRecord');
  submitButton.addEventListener('click', () => {
    createBook();
    displayBook(books[(books.length - 1)]);
    hideButton();
    destroyForm();
  });
}

const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', () => {
  createForm();
  hideButton();
  submitForm();
});

if (books.length > 0) {
  listBooks(books);
}
