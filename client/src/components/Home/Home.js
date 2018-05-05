import React from 'react';
import TopPanel from '../../containers/TopPanel';
import ArticleCard from '../../containers/ArticleCard';
import ArticlePost from '../../containers/ArticlePost';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { SHOW_ALL_FILTER, SHOW_BY_DATE_FILTER } from '../../constants';

class Home extends React.Component {

    render() {
        
        const {articles} = this.props;
        
        const dateFilters = [
            {id: 0,date: new Date("2018-01-01"), string: "Janvier 2018"},
            {id: 1,date: new Date("2018-02-01"), string: "Février 2018"},
            {id: 2,date: new Date("2018-03-01"), string: "Mars 2018"},
            {id: 3,date: new Date("2018-04-01"), string: "Avril 2018"},
            {id: 4,date: new Date("2018-05-01"), string: "Mai 2018"},
            {id: 5,date: new Date("2018-06-01"), string: "Juin 2018"},
            {id: 6,date: new Date("2018-07-01"), string: "Juillet 2018"},
            {id: 7,date: new Date("2018-08-01"), string: "Août 2018"},
            {id: 8,date: new Date("2018-09-01"), string: "Septembre 2018"}
        ]
        return (
            <div className="container" >
                <TopPanel article={articles.slice(-1)[0]} displayArticle={this.props.actions.displayArticleAction}/>
                <div className="row mb-2">
                        { this.getFeaturedArticles().map((article, index) =>
                        <ArticleCard key={index} article={article} displayArticle={this.props.actions.displayArticleAction} />) }
                </div>
                    <main role="main" className="container">
                        <div className="row">
                            <div className="col-md-10 blog-main">
                                <h3 className="pb-3 mb-4 font-italic border-bottom">
                                    Derniers Articles
                                    <button className="btn btn-outline-primary float-right" onClick={e => this.resetFilterClick()}>
                                        Voir tous les articles
                                    </button>
                                </h3>

                                { this.getVisibleArticles().map((article, index) =>
                                <ArticlePost key={index} article={article} />) }
                            </div>
                        <aside className="col-md-2 blog-sidebar">
                            <div className="p-3 mb-3 bg-light rounded">
                                <h4 className="font-italic">A propos</h4>
                                <p className="mb-0">Ce site permet de partager les technologies sur lesquels je travaille n'hésitez pas à laisser des commentaires et des notes !</p>
                            </div>
                            <div className="p-3">
                                <h4 className="font-italic">Archives</h4>
                                <ol className="list-unstyled mb-0">
                                    { dateFilters.map(filter =>
                                        <li key={filter.id} style = {
                                            {
                                                color: "blue",
                                                cursor: "pointer"
                                            }
                                        }
                                        onClick = {e => this.handleFilterClick(filter.date)}>
                                            {filter.string}
                                        </li>
                                    )}
                                </ol>
                            </div>

                            <div className="p-3">
                                <h4 className="font-italic">Source</h4>
                                <ol className="list-unstyled">
                                    <li><a href="/">GitHub</a></li>
                                </ol>
                            </div>
                        </aside>   
                    </div>    
                </main>
            </div>
        )
    }

    handleFilterClick(date){
        this.props.actions.filterAction(date);
    }

    resetFilterClick(){
        this.props.actions.filterAction()
    }

    getVisibleArticles() {
        const {articles, filter} = this.props;

        switch (filter.type) {
            case SHOW_ALL_FILTER:
                return articles;
            case SHOW_BY_DATE_FILTER:                
                return articles.filter(article => new Date(article.published_at).getMonth() === filter.date.getMonth());
            default:
                console.error('Unknown filter: ' + filter);
                return articles;
        }
    }

    getFeaturedArticles(){
        const {articles} = this.props;
        return articles[0].title !== undefined ? articles.slice(0, 4) : [];
    }
}

function mapStateToProps(store) {
    return {
        articles: store.articles
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(ownProps.actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);