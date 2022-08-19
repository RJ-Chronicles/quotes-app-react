import { Fragment } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, asceding)=>{
  return quotes.sort((quoteA, quoteB) =>{
    if(asceding){
      return quoteA.id > quoteB.id ? 1: -1
    }else{
      return quoteA.id < quoteB.id ? 1: -1
    }
  })
}
const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  //const match = useRouteMatch();
  const queryParams = new URLSearchParams(location.search)
  let isSortingAscending = queryParams.get('sort') === 'asc'

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)
  const changeSortingHandler =()=>{
    history.push({
      pathname:location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc': 'asc')}`
    })
    //history.push(`${match.path}?sort=` + (isSortingAscending ? 'desc': 'asc'))
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending'  : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
