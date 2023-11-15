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
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML = '';

    myLibrary.forEach(book =>{
        const bookInfo = document.createElement('p');
        bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Pages:${book.pages}, Read:${book.read}`

        libraryContainer.appendChild(bookInfo);
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

})