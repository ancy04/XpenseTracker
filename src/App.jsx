import { useEffect, useRef, useState } from 'react'
//styles
import './App.css';
//components
//import Navbar from './components/Navbar/Navbar'
import AppHead from './components/AppHead/AppHead'
import AppBody from './components/AppBody/AppBody';
//contexts
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts"
//variables
//import { dummyData } from './dummyTransactions';
//import Navbar from './components/Navbar/Navbar';

function App() {

  

  const [money, setMoney] = useState({
    balance: 5000,
    expenses: 0
  })

  
  const [transactionData, setTransactionData] = useState([]);
  const initialRender = useRef(true);


     useEffect(() => {
      if (initialRender.current) {
        onLoad();
        initialRender.current = false;  // <-- move here
      }
    }, []);

    // useEffect(() => {
    //   if (!initialRender.current) {
    //     localStorage.setItem("allData", JSON.stringify({ money, transactionData }));
    //   }
    // }, [money, transactionData]);

  useEffect(() => {
  if (!initialRender.current) {
    localStorage.setItem("allData", JSON.stringify({ money, transactionData }));
    localStorage.setItem("transactions", JSON.stringify(transactionData));
    localStorage.setItem("money", JSON.stringify(money));
    localStorage.setItem("expenses", JSON.stringify(transactionData)); 
  }
}, [money, transactionData]);





  const onLoad = () => {
  const localData = localStorage.getItem("allData");
  if(localData){
    const {money, transactionData} = JSON.parse(localData);
    setMoney(money);
    setTransactionData(transactionData);
  }
}

  

  return (
    <main className='App'>
      <MoneyContext.Provider value={[money, setMoney]}>
      <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
        <AppHead balance={money.balance} expenses={money.expenses}/>
        <AppBody transactionData={transactionData}/>
      </TransactionsContext.Provider> 
      </MoneyContext.Provider>
    </main>
  )
}

export default App
