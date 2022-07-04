//constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//Display Constructor
function Display() {}

// Add method to display prototype
Display.prototype.add = function (book) {
  tableBody = document.getElementById("tableBody");
  let uiString = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr> `;
  tableBody.innerHTML += uiString;
};

// clear Function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, showMessage) {
  let message = document.getElementById('message');
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                          <strong>Message:</strong> ${showMessage}
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;

    setTimeout(function(){
        message.innerHTML="";
    },2000)
};

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  // console.log("submitted");

  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let java = document.getElementById("java");
  let python = document.getElementById("python");
  let web = document.getElementById("web");
  let type;

  if (java.checked) {
    type = java.value;
  } else if (python.checked) {
    type = python.value;
  } else if (web.checked) {
    type = web.value;
  }

  let book = new Book(name, author, type);
  // console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show('success', 'Your book has been successfully added');
  } 
  else {
    display.show('danger', 'Sorry you cannot add this book');
  }

  e.preventDefault();
}
