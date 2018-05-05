import React, { Component } from 'react';

export default class ArticleCard extends Component {
    render(){

        const {article} = this.props;

        return(
            <div className="col-md-6">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                    <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2 text-primary">{article.category}</strong>
                        <h3 className="mb-0">
                            <a className="text-dark" href="/">{article.title}</a>
                        </h3>
                        <div className="mb-1 text-muted">{article.published_at}</div>
                        <p className="card-text mb-auto">{article.description}</p>
                        <button className="btn btn-info" onClick={e => this.handleViewArticleClick(article)}>Lire la suite...</button>
                    </div>
                    <img className="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt={`Card ${article.id}`} />
                </div>
            </div>
        )
    }

    handleViewArticleClick(article){
        this.props.displayArticle(article);
    }
}