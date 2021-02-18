let books = []

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.changeStatus = function () {
    this.readStatus = !(this.readStatus);
}

function elementAttributes(element, id, name, type, placeholder = '') {
    element.setAttribute('id', id);
    element.setAttribute('name', name);
    element.setAttribute('type', type);
    element.setAttribute('placeholder', placeholder);
}

function createForm() {

    let form = document.createElement("tr");
    form.setAttribute('id', 'newRecord');
    let inputTitle = document.createElement("input");
    elementAttributes(inputTitle, 'title', 'title', 'text', "Book's title")
    let inputAuthor = document.createElement("input");
    elementAttributes(inputAuthor, 'author', 'author', 'text', "Author's name")
    let inputPages = document.createElement("input");
    elementAttributes(inputPages, 'pages', 'pages', 'text', "Book's pages")
    let inputReadStatus = document.createElement("input");
    elementAttributes(inputReadStatus, 'read', 'read', 'checkbox');
    let submitButton = document.createElement("button");
    submitButton.textContent = "Add Book";
    elementAttributes(submitButton, 'addRecord', 'addRecord', 'submit');
    let inputs = [inputTitle, inputAuthor, inputPages, inputReadStatus, submitButton]
    for (let i = 0; i < inputs.length; i++) {
        let tableData = document.createElement("td");
        tableData.appendChild(inputs[i]);
        form.append(tableData);
    }
    let table = document.getElementById('table');
    table.appendChild(form);
}

function displayBook(book) {
    let tableRow = document.createElement("tr");
    let bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    let bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;
    let bookPages = document.createElement("td");
    bookPages.textContent = book.pages;
    let readStatus = document.createElement("td");
    readStatus.textContent = book.readStatus;
    let buttonTd = document.createElement("td");
    let buttonContainer = document.createElement('div');
    let readButton = document.createElement("button");
    readButton.textContent = "Read";
    let removeButton = document.createElement("button");
    removeButton.textContent = "Delete";

    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);
    buttonTd.appendChild(buttonContainer);


    let bookRecords = [bookTitle, bookAuthor, bookPages, readStatus, buttonTd]
    for (let i = 0; i < bookRecords.length; i++) {
        tableRow.appendChild(bookRecords[i]);
    }

    let table = document.getElementById('table');
    table.appendChild(tableRow);
}

function hideButton() {
    let addBookButton = document.getElementById('addBook');
    addBookButton.classList.toggle('hidden');
}

function listBooks(books) {
    books.forEach(book => displayBook(book));
}

let addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', () => {
    createForm(), hideButton(), submitForm()
})

function createBook() {
    let inputTitle = document.getElementById('title');
    let inputAuthor = document.getElementById('author');
    let inputPages = document.getElementById('pages');
    let inputReadStatus = document.getElementById('read');
    let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputReadStatus.checked);
    books.push(newBook);
}

function destroyForm() {
    let form = document.getElementById('newRecord');
    form.remove();
}

function submitForm() {
    let submitButton = document.getElementById('addRecord');
    submitButton.addEventListener('click', () => {
        createBook(), displayBook(books[(books.length - 1)]), hideButton(), destroyForm()
    });
}