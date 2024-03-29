const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };
};

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook);
    displayLibrary();
};

function displayLibrary(){
    const libraryContainerYes = document.querySelector('.bookContainerYes');
    const libraryContainerNo = document.querySelector('.bookContainerNo');

    libraryContainerYes.innerHTML = '';
    libraryContainerNo.innerHTML = '';

    myLibrary.forEach(book =>{
        const bookItem = document.createElement('div');
        const removeButton = document.createElement('button');
        const readButton = document.createElement('button');
        const bookButtons = document.createElement('div');

        bookItem.classList.add('bookItem');
        bookButtons.classList.add('bookButtons');
        removeButton.classList.add('removeButton');
        readButton.classList.add('readButton');

        const removeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        removeIcon.setAttribute("fill", "currentColor");
        removeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        removeIcon.setAttribute("viewBox", "0 0 24 24");   
        removeIcon.innerHTML = '<path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z" />'

        const readIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        readIcon.setAttribute("fill", "currentColor");
        readIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        readIcon.setAttribute("viewBox", "0 0 24 24");
        readIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Update Status</title><path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" /></svg>';

        bookItem.innerHTML = `<h4>${book.title}</h4><p class="bookAuthor">By: ${book.author}</p><p class="bookPages">${book.pages} Pages</p>`;

        removeButton.addEventListener('click', function(){
            const bookIndex = myLibrary.indexOf(book);
            if(bookIndex !== -1){
                myLibrary.splice(bookIndex, 1);
                displayLibrary();
            };
        });

        readButton.addEventListener('click', function(){
            book.read = book.read === "Yes" ? "No" : "Yes";
            displayLibrary();
        });
    
        removeButton.appendChild(removeIcon);
        readButton.appendChild(readIcon);

        bookItem.appendChild(removeButton);
        bookItem.appendChild(readButton);
        bookItem.appendChild(bookButtons);

        bookButtons.appendChild(removeButton);
        bookButtons.appendChild(readButton);

        if(book.read === "Yes"){
            libraryContainerYes.appendChild(bookItem);
        }else{
            libraryContainerNo.appendChild(bookItem);
        };
    });
};

const form = document.getElementById('bookForm');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.querySelector('input[name="read"]:checked');

title.addEventListener('input',()=>{
    if(title.validity.tooShort){
        title.setCustomValidity("Please double check the title. Must have more than 2 characters");
    } else{
        title.setCustomValidity("");
    };
});

author.addEventListener('input', () => {
    if (author.validity.tooShort) {
        author.setCustomValidity("Too short! Must have more than 2 characters");
    } else if (/\d/.test(author.value)) { 
        author.setCustomValidity("Invalid input: Numbers are not allowed");
    } else {
        author.setCustomValidity("");
    };
});

form.addEventListener('submit',function(e){
    e.preventDefault();

    addBookToLibrary(title.value , author.value, pages.value , read.value);

    document.getElementById('bookForm').reset();
    formDialog.close();
});

/**
 * Dialog Funcionality
 */
const formDialog = document.getElementById("formDialog");
const showButton = document.getElementById("showButton");
const closeButton = document.getElementById("closeButton");

showButton.addEventListener("click",() =>{
    formDialog.showModal();
});

closeButton.addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById('bookForm').reset();
    formDialog.close();
});

/**
 * Dark Mode
 */
const darkModeBtn = document.querySelector(".darkModeBtn");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

darkModeBtn.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      var theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      var theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
    }
    localStorage.setItem("theme", theme);
});

addBookToLibrary("Dune", "Frank Herbert", 617, "Yes");
addBookToLibrary("Sapiens", "Yuval Noah Harari", 414, "No");