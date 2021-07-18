window.addEventListener('DOMContentLoaded', () => {
  let library = document.querySelector('.library');
  let submitButton = document.querySelector('#submit-button');
  let form = document.querySelector('.form');
  let bookName = document.querySelector('#bookName');
  let authorName = document.querySelector('#authorName');
  let pages = document.querySelector('#pages');
  let readStatus = document.querySelector('#read');
  let myLibrary = [];

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
    info() {
     return `${title} by ${author}, ${pages} pages, is ${read}.`;
    }
  }

//DOM book container builder
function createBook(title, author, pages, read) {
  //container
  let containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  //container header
  let containerHeaderDiv = document.createElement('div');
  containerHeaderDiv.classList.add('container-header');
  containerDiv.appendChild(containerHeaderDiv);
  //name of book
  containerHeaderH2 = document.createElement('h2');
  containerHeaderH2.textContent = `${title}`;
  containerHeaderDiv.appendChild(containerHeaderH2);
  //close button
  containerHeaderButton = document.createElement('button');
  containerHeaderButton.innerHTML = '<span class="material-icons">❌</span>';
  containerHeaderButton.classList.add('close-button');
  containerHeaderButton.addEventListener('click', deleteBook);
  containerHeaderDiv.appendChild(containerHeaderButton);
  //container body
  containerBodyDiv = document.createElement('div');
  containerBodyDiv.classList.add('container-body');
  containerDiv.appendChild(containerBodyDiv);
  //name of author
  containerBodyH3 = document.createElement('h3');
  containerBodyH3.textContent = `by ${author}`;
  containerBodyDiv.appendChild(containerBodyH3);
  //number of pages
  containerBodyH4 = document.createElement('h4');
  containerBodyH4.textContent = `${pages} pages`;
  containerBodyDiv.appendChild(containerBodyH4);
  //container footer
  containerFooterDiv = document.createElement('div');
  containerFooterDiv.classList.add('container-footer');
  containerDiv.appendChild(containerFooterDiv);
  //read status change button
  containerFooterButton = document.createElement('button');
  containerFooterButton.setAttribute('type', 'button');
  containerFooterButton.textContent = 'Unread';
  containerFooterDiv.appendChild(containerFooterButton);
  containerFooterButton.addEventListener('click', changeReadStatus);
  // apperance of books which is not read
  if (read !== 'read') {
    containerFooterButton.textContent = 'Read';
    containerDiv.style.color = 'var(--color3)';
    containerDiv.style.background = 'var(--color4)';
    containerFooterButton.style.color = 'var(--color3)';
    containerFooterButton.style.backgroundColor = 'var(--color5)';
  }
  // append containter div
  library.appendChild(containerDiv);
}

  function addBookToLibrary() {

  //take inputs from form and create book
  submitButton.addEventListener('click', (x) => {
    let bookNameValue = bookName.value;
    let authorNameValue = authorName.value;
    let pagesValue = pages.value;
    let isItRead = undefined;
    //ask user to fill all of the fields
    if (!bookNameValue || !authorNameValue || !pagesValue) {
      return window.alert('You have to fill all of the fields.');
    } else {
      // take read - unread input
      if (readStatus.value === 'yes') {
        isItRead = 'read';
      } else {
        isItRead = 'not read';
      }
      //create new book object and push library array
      myLibrary.push(
        new Book(
          `${bookNameValue}`,
          `${authorNameValue}`,
          `${pagesValue}`,
          `${isItRead}`
        )
      );
      //reset form fields
      form.reset();
    }

    //append new book to page
    // displayBook();
     // SAVE TO LOCAL STORAGE
    localStorage.setItem('books', JSON.stringify(myLibrary));
    displayBook();

    //clear book from library array
    myLibrary = [];
  });
}

addBookToLibrary();

//append new book to page
function displayBook() {
  myLibrary.forEach((x) => {
    createBook(`${x.title}`, `${x.author}`, `${x.pages}`, `${x.read}`);
  });
}
//delete DOM element (book container) from page
function deleteBook() {
  document.querySelector('body').addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('material-icons')) {
      e.target.parentNode.parentNode.parentNode.remove();
    }
  });
}

//change read status of book container
function changeReadStatus(e) {
  if (e.target.textContent === 'Read') {
    e.target.textContent = 'Unread';
    e.target.style.color = 'var(--color3)';
    e.target.style.background = 'var(--color5)';
    e.target.parentNode.parentNode.style.color = 'var(--color3)';
    e.target.parentNode.parentNode.style.background = 'var(--color5)';
    } else {
      e.target.textContent = 'Read';
      e.target.style.color = 'var(--color3)';
      e.target.style.background = 'var(--color5)';
      e.target.parentNode.parentNode.style.color = 'var(--color3)';
      e.target.parentNode.parentNode.style.background = 'var(--color4)';
    }
  }


 // GET BOOKS FROM LOCAL STORAGE
  if (localStorage.getItem('books') === null) {
    myLibrary = [];
  } else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
  }
});