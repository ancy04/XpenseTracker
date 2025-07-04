import { useContext, useEffect, useState } from 'react';
//components
import FormButtons from '../FormButtons/FormButtons';
//contexts
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';
//style

import PropTypes from 'prop-types';

const ModalForm = props => {
    //props
    const { toggleModal, formType, existingData } = props;
    //contexts
    const [money, setMoney] = useContext(MoneyContext);
    const [transactionData, setTransactionData] = useContext(TransactionsContext);
    //check for existing data to update transaction
    useEffect(()=> {
        if(existingData) updateFormDataWithExistingData();
    }, [])
    //states
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        date: new Date().toISOString().split("T")[0], //gives date in yyyy-mm-dd format
        category: "",
    })
    const [balanceFormData, setBalanceFormData] = useState({income: ""});
    //functions
    const updateFormDataWithExistingData = () => {
        console.log(existingData)
        const {title, date, amount, category} = existingData;
        setFormData({
            title: title,
            price: amount,
            date: date,
            category: category
        })
    }
    const handleChange = evt => {
        const key = evt.target.name, value = evt.target.value;
        console.log("Updating:", key, value);
        setFormData({...formData, [key]: value });
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        // Edit Expense
        if(formType === "Add Balance"){
            setMoney({
                ...money,
                //balance: money.balance + balanceFormData.income
                balance: money.balance + Number(balanceFormData.income)

            });

        }
        if(formType === "Add Expense"){
            let newExpense = money.expenses + Number(formData.price);
            let newBalance = money.balance - Number(formData.price);

            if(newBalance < 0){
                return alert("Out of balance");
            }else{
                let newId = Date.now().toString();
                let newTransaction = {...formData, id: newId};
                setMoney({balance: newBalance, expenses: newExpense});
                setTransactionData([...transactionData, newTransaction]);
            }
        }
        if(formType === "Edit Expense"){
            let newExpense = money.expenses + Number(formData.price) - Number(existingData.amount);
            let newBalance = money.balance - Number(formData.price) + Number(existingData.amount);

            if(newBalance < 0) return alert("Out of balance");
            
            //get index of transaction
            const indexOfTransaction = transactionData.findIndex(transaction => existingData.id === transaction.id);
            //store transaction data in new variable
            const updatedTransaction = {...formData, id: existingData.id};
            //add that new tranaction at that index with same id
            //transactionData[indexOfTransaction] = updatedTransaction;
            let updatedTransactions = [...transactionData];
            updatedTransactions[indexOfTransaction] = updatedTransaction;
            setTransactionData(updatedTransactions);

            setMoney({balance: newBalance, expenses: newExpense});
            //setTransactionData([...transactionData]);
        }

        toggleModal();
    }

    const expenseAndEditInput = () => {
        return (
            <div className='formInputsDiv'>
                <input 
                required
                value={formData.title}
                className="formInput" 
                onChange={handleChange} 
                placeholder='Title' 
                type='text' 
                name='title'
                autoFocus
                />
                <input 
                required
                value={formData.price}
                className="formInput" 
                onChange={handleChange} 
                placeholder='Price' 
                type='number' 
                name='price'
                />
                <select
                value={formData.category} 
                className="formInput" 
                onChange={handleChange} 
                placeholder='Select Category' 
                name='category'>
                    {/* <option value={null}>Select Category</option> */}
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>
                </select>
                <input 
                required
                value={formData.date}
                className="formInput" 
                onChange={handleChange} 
                placeholder='dd/mm/yyyy' 
                type='date' 
                name='date'
                />
            </div>
        )
    } 
    const incomeInputs = () => {
        return (
            <div className='balanceFormInputDiv'>
                <input 
                className="formInput" 
                onChange={e=> setBalanceFormData({income: +e.target.value})} 
                placeholder='Income Amount' 
                type='number' 
                name='income' 
                value={balanceFormData.income}
                autoFocus
                required
                />
            </div>
        )
    }
    return (
        <form className='modalForm expensesForm' onSubmit={handleSubmit}>
            {formType === "Add Balance" ? incomeInputs() : expenseAndEditInput()}
            <FormButtons text={formType} toggleModal={toggleModal}/>
        </form>
    )
}


ModalForm.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  existingData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    category: PropTypes.string,
  }),
};

export default ModalForm;