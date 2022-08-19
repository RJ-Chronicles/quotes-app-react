import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetails = () => {
    const params = useParams();
    const match = useRouteMatch();

    const {quoteId} = params;
    const {sendRequest, status, data : loadedQuote, error} = useHttp(getSingleQuote, true)
    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest, quoteId])

    if(status === 'pending'){
        return<div className="centered">
            <LoadingSpinner/>
        </div>
    }

    if(status === 'error'){
        return(<p className="centered">{error}</p>)
    }
    if (!loadedQuote.text) {
        return <p>No Quote found</p>
    }


    return (
        <React.Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path ={match.path}  exact> 
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comment`}>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comment`}>
                <Comments />
            </Route>
        </React.Fragment>
    )
}

export default QuoteDetails;

//{`/quotes/${params.quoteId}`}
// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Mars', text: 'Learning React is fun!' },
//     { id: 'q2', author: 'Mars', text: 'Learning React is great!' }
// ]
//    const quote = DUMMY_QUOTES.find((quote) => quote.id === id)
    