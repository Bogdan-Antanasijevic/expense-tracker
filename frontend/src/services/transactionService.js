import axios from 'axios'

class TransactionService {
    static newTransaction(body){
        return axios.post('/api/new-transaction',body)
    }
    static getTransactionsByUsername(user){
        return axios.get(`/api/get-transactions/${user}`)
    }
}

export default TransactionService