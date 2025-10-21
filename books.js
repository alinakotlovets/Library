
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

}


const form = document.getElementById('form-add-books');
const books_list = document.querySelector('.books-list')


class Library {

    constructor() {
        this.library = [];
    }


    addBook(book) {
        this.library.push(book);
    }

    removeBook(index) {
        this.library.splice(index, 1);
    }

    getAllBooks() {
        return this.library;
    }

}

const myLibrary = new Library();

class renderBooks extends Library {

    constructor(addBook, removeBook, getAllBooks) {
        super(addBook, removeBook, getAllBooks);
    }

    renderBook(book) {
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read').checked;

        const newBook = new Book(title, author, pages, read);

        super.addBook(newBook);

    }

    renderAll() {
        books_list.innerHTML = '';

        for (let book of this.library) {
            const book_li = document.createElement('li');
            book_li.classList.add('book-item');

            const book_title = document.createElement('p');
            book_title.classList.add('book-title');
            book_title.textContent = `${book.title}`;

            const book_author = document.createElement('p');
            book_author.classList.add('book-author');
            book_author.textContent = `Author: ${book.author}`;

            const book_pages = document.createElement('p');
            book_pages.classList.add('book-pages');
            book_pages.textContent = `Pages: ${book.pages}`;

            const book_status = document.createElement('p');
            book_status.classList.add('book-status');
            book_status.textContent = `Status: ${book.read ? 'Read' : 'Not read'}`;

            const book_btns = document.createElement('div');
            book_btns.classList.add('book-btns');

            const book_btn_status = document.createElement('button');
            book_btn_status.classList.add('book-btn-status');
            book_btn_status.textContent = `Change status`;

            const book_btn_delete = document.createElement('button');
            book_btn_delete.classList.add('book-btn-delete');
            book_btn_delete.textContent = `Remove`;

            book_btn_status.addEventListener('click', function () {
                if (book_status.textContent.includes('Read')) {
                    book_status.textContent = 'Status: Not read';
                } else {
                    book_status.textContent = 'Status: Read';
                }
            });

            book_btn_delete.addEventListener('click', function () {
                myLibrary.removeBook(myLibrary.library.indexOf(book));
                book_li.remove();
            })

            book_btns.append(book_btn_delete, book_btn_status);

            book_li.append(book_title, book_author, book_pages, book_status, book_btns);


            books_list.appendChild(book_li);


        }

    }
}

const render = new renderBooks();


document.getElementById('form-btn').addEventListener("click", function () {
        let form = document.getElementById('form-add-books');
        let overlay = document.getElementById('form-overlay');
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'flex';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            form.reset();
        } else {
            form.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            form.reset();
        }
    }
)

document.getElementById('form-overlay').addEventListener('click', function () {
    let form = document.getElementById('form-add-books');
    form.style.display = 'none';
    this.style.display = 'none';
    form.reset();
    document.body.style.overflow = '';

})


document.getElementById('form-close').addEventListener('click', function () {
    let overlay = document.getElementById('form-overlay');
    let form = document.getElementById('form-add-books');
    form.style.display = 'none';
    overlay.style.display = 'none';
    form.reset();
    document.body.style.overflow = '';

})


form.addEventListener('submit', function (event) {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let overlay = document.getElementById('form-overlay');
    event.preventDefault();

    const newBook = new Book(title, author, pages, read);
    myLibrary.addBook(newBook);
    render.library = myLibrary.library;
    render.renderAll();
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('form-add-books').reset();
    form.style.display = 'none';


});

