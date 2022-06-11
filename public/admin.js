// Retrieve a list of books from the server
async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
}

//Display a list of book title to the admin
async function renderBook(book) {

    let root = document.querySelector('#root')

    let li = document.createElement('li')
    li.textContent = book.title

//Give each text input a value: the quantity of the associated book

    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity

//Place a submit button next to each text input

    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

saveButton.addEventListener('click', ()=> {
    fetch('http://localhost:3001/updateBook', {

        header: {
            "Content-Type": "application/json"
        },
        method: 'PATCH',
        
        body: JSON.stringify({ id: book.id, quantity: quantityInput.value})
    })

})

li.append(quantityInput, saveButton)

root.append(li)

}

main()