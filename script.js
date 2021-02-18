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

