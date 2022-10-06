import axios from 'axios'

class TransactionService {
    static newTransaction(body){
        return axios.post('/api/new-transaction',body)
    }
    static getTransactionsByUsername(user){
        return axios.get(`/api/get-transactions/${user}`)
    }
    static resetBalance(user){
        return axios.delete(`/api/reset-balance/${user}`)
    }
}

export default TransactionService