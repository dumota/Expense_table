const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactiomAmount = document.querySelector('#amount')



const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []


// Function para remover itens
const removeTransaction = ID =>{
    transactions = transactions
    .filter(transaction => transaction.id !==  ID)
    updateLocalStorage()
    init()
}

//função para adicionar coisas na list vazia
const addTransactionIntoDom = transaction =>{
    const operator = transaction.amount <0 ? '-' : '+'
    const CSSClass = transaction.amount <0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
        </button>
    `

    transactionUl.append(li)
 
}
// Função para dar update nas tabelas de balanço
const updateBalance = ()=>{
    const transactionsAmount = transactions
    .map(transaction =>
        transaction.amount
        
    )
    const total = transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
    const income = transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value)=> accumulator+ value , 0)
    .toFixed(2)
    const expense = Math.abs(transactionsAmount
    .filter( value => value < 0)
    .reduce((accumulator , value)=> accumulator + value , 0))
    .toFixed(2)
    // o filter precisa de uma aero function , ele gera um array especifico de um array
    //método tofixed(), serve para colocar 2 decimais após a function
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

// função que inicia tudo
const init = ()=>{
    transactionUl.innerHTML = ''

    transactions.forEach(addTransactionIntoDom)
    updateBalance()
}

init()


//função para dar update no localstorage do browser
const updateLocalStorage = ()=>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

//gerador de id aleatório
const generateID = ()=>{
    Math.round(Math.random() * 1000)
}


//function que envia os novos dados a tabela atraves do form
form.addEventListener('submit',(event)=>{
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactiomAmount.value.trim()

    if(inputTransactionName.value.trim() === '' || inputTransactiomAmount.value.trim()=== ''){
        alert('Por favor preencha todos os campos!')
        return
    }
    //com o return ai embaixo n]ao precisa do else , pq ele vai retornar

    const transaction = {
        id : generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactiomAmount.value = ''
})