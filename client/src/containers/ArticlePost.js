import React, { Component } from 'react';

export default class ArticlePost extends Component {

    render(){

        const {article} = this.props;

        return(
            <div className="blog-post">
                <h2 className="blog-post-title">{article.title}</h2>
                <p className="blog-post-meta">{article.published_at}</p>

                <p>{article.shortDescription}</p>
                <hr/>
                <div>
                    {article.description}
                </div>
            </div>
        )
    }
}