let books = []

let storageItems = window.localStorage.getItem('books');
storageItems = JSON.parse(storageItems);
if (storageItems){
storageItems.forEach(book => {
    let newBook = new Book(book.title, book.author, book.readStatus, book.readStatus);
    books.push(newBook);
})
}

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

function stringifyReadStatus(readStatus) {
    if (readStatus) {
        return "Book Read";
    }
    else {
        return "Unread"
    }
}

function displayBook(book) {
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("id", "book-"+books.indexOf(book))
    let bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    let bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;
    let bookPages = document.createElement("td");
    bookPages.textContent = book.pages;
    let readStatus = document.createElement("td");
    readStatus.setAttribute("id", "status"+books.indexOf(book));
    readStatus.textContent = stringifyReadStatus(book.readStatus);
    let buttonTd = document.createElement("td");
    let buttonContainer = document.createElement('div');
    let readButton = document.createElement("button");
    readButton.textContent = "Read";
    let removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.setAttribute("data-attribute", books.indexOf(book).toString());
    removeButton.setAttribute("id", "deleteBooks")

    removeButton.addEventListener('click', () => {
        books.splice(Number(removeButton.getAttribute("data-attribute")), 1);
        removeButton.parentNode.parentNode.parentNode.remove();
        let stringifyBooks = JSON.stringify(books)
        window.localStorage.setItem('books', stringifyBooks);
    })

    readButton.addEventListener('click', () => {
    
        let statusField = document.getElementById("status"+removeButton.getAttribute("data-attribute"));
        book.changeStatus();
        statusField.textContent = stringifyReadStatus(book.readStatus);

    })

 

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
    createForm();
    hideButton();
    submitForm();
})

function createBook() {
    let inputTitle = document.getElementById('title');
    let inputAuthor = document.getElementById('author');
    let inputPages = document.getElementById('pages');
    let inputReadStatus = document.getElementById('read');
    let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputReadStatus.checked);
    books.push(newBook)
    let stringifyBooks = JSON.stringify(books)
    window.localStorage.setItem('books', stringifyBooks);
}

function destroyForm() {
    let form = document.getElementById('newRecord');
    form.remove();
}

function submitForm() {
    let submitButton = document.getElementById('addRecord');
    submitButton.addEventListener('click', () => {
        createBook();
        displayBook(books[(books.length - 1)]);
        hideButton();
        destroyForm();
    });
}
if(books.length > 0){
listBooks(books);
}