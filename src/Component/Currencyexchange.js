import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Currencyexchange() {
    const [fetchcurrency,setFetchCurrency]=useState([]);
    const[inputCurrency,setInputCurrency]=useState(1);
    const[fromCurrency,setFromCurrency]=useState("SGD");
    const[toCurrency,setToCurrency]=useState("INR");
    const[convertedAmount,setConvertedAmount]=useState();
    useEffect(()=>{
        const currencyConvertion=async()=>{
            try {
                const response= await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                console.log(response);
                setFetchCurrency(response.data.rates);
            }
            catch(error){
                console.log(error);
            }
        }
        currencyConvertion();
    },[fromCurrency,toCurrency])
    

    const handleConvert=()=>{
        const convertedAmount=(inputCurrency*fetchcurrency[toCurrency]);
        console.log(convertedAmount);
        setConvertedAmount(convertedAmount);
    }

  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen'>

        <div className='container border w-full mx-3 md:mx-auto md:w-3/12 md:h-auto md:my-20 shadow-xl rounded   *:mx-5 *:rounded-lg *:px-5 *:py-4'>
            <h1 className='text-2xl font-semibold text-gray-700 my-5 text-center'>Currency Converter</h1>
                <div className='overflow-hidden *:mx-2 '>
                <label htmlfor="amount" className='text-xl font-medium my-2 text-start'>Amount:</label>
                <input type="number" value={inputCurrency} onChange={(e)=>{setInputCurrency(e.target.value)}}className= ' w-full my-3 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md shadow-lg text-xl px-3 mx-4 py-4' ></input>
                </div>
                <div className='overflow-hidden *:mx-2 '>
                <lable className='text-xl font-medium my-2 text-start'>From:</lable>
                <select value={fromCurrency} onChange={(e)=>{setFromCurrency(e.target.value)}} className='w-full px-3 py-4 overflow-hidden rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    {Object.keys(fetchcurrency).map((currency,index)=>(
                        <option key={index} value={currency}>{currency}</option>
                    ))}</select>
                </div>
                <div className='overflow-hidden *:mx-3 '>
                <lable className='text-xl font-medium my-2 text-start'>To:</lable>
                <select value={toCurrency} onChange={(e)=>{setToCurrency(e.target.value)}} className='w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                {Object.keys(fetchcurrency).map((currency,index)=>(
                        <option key={index} value={currency}>{currency}</option>
                    ))}   
                </select>
                </div>
                <div className='overflow-hidden *:mx-2'><button onClick={handleConvert} className='w-full mx-7 my-3 overflow-hidden rounded shadow-lg py-3 text-xl text-gray-900 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:bg-indigo-500'>Convert</button></div>
                <div className='my-4  text-2xl text-green-700 font-semibold text-center '>
                {inputCurrency} {fromCurrency} ={ Math.round(convertedAmount)}  {toCurrency}
                </div>
                
        </div>
    </div>
    </>
  )
}

export default Currencyexchange