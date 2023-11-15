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
        const bookDiv = document.createElement('div');
        const bookInfo = document.createElement('p');
        const removeButton = document.createElement('button');
        const readButton = document.createElement('button');

        bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Pages:${book.pages}, Read:${book.read}`
        removeButton.textContent = "Remove"
        readButton.textContent = book.read === "Yes" ? "Read" : "Not Read";

        removeButton.addEventListener('click', function(){
            const bookIndex = myLibrary.indexOf(book);
            if(bookIndex !== 1){
                myLibrary.splice(bookIndex, 1);
                displayLibrary();
            }
        })

        readButton.addEventListener('click', function(){
            book.read = book.read === "Yes" ? "No" : "Yes";
            displayLibrary();
        })
    
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(readButton);

        libraryContainer.appendChild(bookDiv);
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

/*************Dialog functionality*************** */
const formDialog = document.getElementById("formDialog")
const showButton = document.getElementById("showButton")
const closeButton = document.getElementById("closeButton")

showButton.addEventListener("click",() =>{
    formDialog.showModal();
})

closeButton.addEventListener("click",(e)=>{
    e.preventDefault();
    formDialog.close();
})