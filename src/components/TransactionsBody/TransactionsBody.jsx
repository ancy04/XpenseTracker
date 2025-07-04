import { useContext, useEffect, useState } from 'react';
//styles
import "./TransactionsBody.css"
//components
import TransactionBar from '../TransactionBar/TransactionBar';
import PageNavigateBar from './PageNavigateBar';
//contexts
import { TransactionsContext } from '../../Contexts/AllContexts';
//import PropTypes from 'prop-types';

const TransactionsBody = () => {
    //contexts
    const [transactionData] = useContext(TransactionsContext);
    //states
    const [pages, setPages] = useState({ currentPage: 1, totalPages: 1 })
    //everytime transactionData updates
    useEffect(()=> {
        onLoad();
    }, [transactionData])
    //functions
    const displayTransactions = () => {
        let key = 0;
        if(transactionData && transactionData.length){
            let arr =[];
            let startIndex = 5 * (pages.currentPage - 1)
            let endIndex = (5 * pages.currentPage) - 1

            for(let i = startIndex; i <= endIndex; i++){
                if(i >= transactionData.length) break;
                const { title, date, price, category, id } = transactionData[i];
                arr.push(
                    <TransactionBar key={`${key++}`} title={title} date={date} amount={price} category={category} id={id}/>
                )
            }

            return arr;
        }
    }
    const onLoad = () =>{
        setPages({ currentPage: 1, totalPages: Math.ceil(transactionData.length / 5) })
    }
    
    const updatePage = direction => {
        let {currentPage, totalPages} = pages;
        if(direction === "right" && currentPage < totalPages){
            setPages({...pages, currentPage: currentPage+1})
        }
        if(direction === "left" && currentPage > 1){
            setPages({...pages, currentPage: currentPage-1})
        }
    }
    return (
        <div className='TransactionBody'>
            <div className='transactionBodyUpper'>
                <div className='transactionPage'>{displayTransactions()}</div>
            </div>
            <div className='transactionBodylower'>
                <PageNavigateBar key={"pageNavigate"} pages={pages} updatePage={updatePage} />
            </div>
        </div>
    );
};

// TransactionsBody.propTypes = {
//   pages: PropTypes.shape({
//     currentPage: PropTypes.number.isRequired,
//     totalPages: PropTypes.number.isRequired,
//   }).isRequired,
//   updatePage: PropTypes.func.isRequired,
// };


export default TransactionsBody;