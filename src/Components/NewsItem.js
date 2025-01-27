import React from 'react';
export default function NewsItem(props) {
        let {title, desc, image, url, author, publishedAt} = props;
        return (
            <div>
                <div className="col">
                    <div className="card">
                        <img src={image} className="card-img-top" alt=""/>
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{desc}</p>
                                <p className="card-text"><small className="text-muted">by {author!==null?author:'Unknown'} on {new Date(publishedAt).toGMTString()}</small></p>
                                <a href={url} target='_blank' rel="noreferrer" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </div>
            </div>
        )
}
