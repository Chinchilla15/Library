const myLibrary = [];

function Book(title, author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook);
    displayLibrary();
}

function displayLibrary(){
    const libraryContainerYes = document.querySelector('.bookContainerYes');
    const libraryContainerNo = document.querySelector('.bookContainerNo');

    libraryContainerYes.innerHTML = '';
    libraryContainerNo.innerHTML = '';

    myLibrary.forEach(book =>{
        const bookItem = document.createElement('div');
        const removeButton = document.createElement('button');
        const readButton = document.createElement('button');

        bookItem.classList.add('bookItem')

        bookItem.innerHTML = `<p>Title: ${book.title}</p><p>Author: ${book.author}</p><p>Pages:${book.pages}</p><p>Read:${book.read}</p>`

        removeButton.textContent = "Remove"
        readButton.textContent = book.read === "Yes" ? "Read" : "Not Read";

        removeButton.addEventListener('click', function(){
            const bookIndex = myLibrary.indexOf(book);
            if(bookIndex !== -1){
                myLibrary.splice(bookIndex, 1);
                displayLibrary();
            }
        })

        readButton.addEventListener('click', function(){
            book.read = book.read === "Yes" ? "No" : "Yes";
            displayLibrary();
        })
    
        bookItem.appendChild(removeButton);
        bookItem.appendChild(readButton);

        if(book.read === "Yes"){
            libraryContainerYes.appendChild(bookItem);
        }else{
            libraryContainerNo.appendChild(bookItem)
        }
    })
}

document.getElementById('bookForm').addEventListener('submit',function(e){
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;

    addBookToLibrary(title,author,pages,read);

    document.getElementById('bookForm').reset();
    formDialog.close();
})

/**
 * Dialog Funcionality
 */
const formDialog = document.getElementById("formDialog")
const showButton = document.getElementById("showButton")
const closeButton = document.getElementById("closeButton")

showButton.addEventListener("click",() =>{
    formDialog.showModal();
})

closeButton.addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById('bookForm').reset();
    formDialog.close();
})

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