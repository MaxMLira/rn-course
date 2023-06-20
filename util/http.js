import axios from 'axios';
const URL_BASE = 'https://react-native-course-12757-default-rtdb.firebaseio.com'
export async function storeExpense(expenseData){
   const response = await axios.post(URL_BASE + '/expenses.json', expenseData );
   const id = response.data.name;
   return id;
}

export async function fetchExpenses(){
    const response = await axios.get(URL_BASE + '/expenses.json');
    const expenses = [];
    for(const key in response.data){
        const expense = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expense);
    }

    return expenses;
}

export  function updateExpense(id, expenseData){
    return axios.put(URL_BASE + `/expenses/${id}.json`, expenseData);

}
export function deleteExpense(id){
    return axios.delete(URL_BASE + `/expenses/${id}.json`);
}