import QuoteList from '../components/quotes/QuoteList'
import {Fragment, useEffect} from 'react'
import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'

const AllQuotes = ()=>{
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getAllQuotes, true)
    useEffect(()=>{
        sendRequest();
    },[sendRequest])
    if(status === 'pending'){
        return(
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }
    if(error){
        return(
            <p className='centered focused'>{error}</p>
        )
    }
    if(status === 'completed' && (!loadedQuote || loadedQuote.length === 0)){
        return <NoQuotesFound/>
    }
    return <Fragment>
        <QuoteList quotes={loadedQuote}/>
    </Fragment>
}

export default AllQuotes;




// const DUMMY_QUOTES=[
//     {id: 'q1', author : 'Mars', text : 'Learning React is fun!'},
//     {id: 'q2', author : 'Mars', text : 'Learning React is great!'}
// ]