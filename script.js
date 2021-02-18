let books = []


function Book( title, author, pages, readStatus ){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.changeStatus = function (){
  this.readStatus = !(this.readStatus);
}

function createForm(){

  let form = document.createElement("tr");
  let inputTitle = document.createElement("input");
  let inputAuthor = document.createElement("input");
  let inputPages = document.createElement("input");
  let inputReadStatus = document.createElement("input");
  let submitButton = document.createElement("button");
  let inputs = [ inputTitle, inputAuthor, inputPages, inputReadStatus, submitButton ]
  for( let i = 0; i < inputs.length; i++){
    let tableData = document.createElement("td");
    tableData.appendChild(inputs[i]);
    form.append(tableData);
  }
  let table = document.getElementById('table');
  table.appendChild(form);
}

function displayBook(book){
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


  let bookRecords = [ bookTitle, bookAuthor, bookPages, readStatus, buttonTd]
  for( let i = 0; i < bookRecords.length; i++){
    tableRow.appendChild(bookRecords[i]);
  }

  let table = document.getElementById('table');
  table.appendChild(tableRow);
}

let newBook = new Book("Anythin", "Anyone", 245, true);
books.push(newBook);


