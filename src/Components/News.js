import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (e) => {
    return e.charAt(0).toUpperCase() + e.substring(1, e.length);
  }

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=cec215c0da894833abcef3a049975759&page=${page}&pageSize=12`;
    document.title = `NewsNamaste - ${capitalize(props.category)}`;
    setLoading(true);
    props.setProgress(27);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMoreData = async () => {
    const nextPage = page + 1; // Increment the page number
    let url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=cec215c0da894833abcef3a049975759&page=${nextPage}&pageSize=12`;
    setLoading(true);

    let data = await fetch(url);
    let parseData = await data.json();

    setArticles((prevArticles) => [...prevArticles, ...parseData.articles]); // Append new articles to the existing ones
    setTotalResults(parseData.totalResults); // Update total results
    setPage(nextPage); // Update the page state
    setLoading(false);
  };




  return (
    <>
      <h2 className='text-center' style={{margin: '30px', marginTop:'90px'}}>NewsNamaste - Top Headlines {(capitalize(props.category))==='General'?'':`from ${(capitalize(props.category))}`}</h2>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className="row">
            {articles.filter((ele) => ele.source.name !== '[Removed]').map((ele) => {
              return <div className="col-md-4 my-2" key={ele.title !== '[Removed]' ? ele.title : Math.random()}>
                <NewsItem title={ele.title} desc={ele.description} image={ele.urlToImage} url={ele.url} author={ele.author} publishedAt={ele.publishedAt} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}
