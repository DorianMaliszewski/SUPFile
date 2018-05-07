import React from 'react';
import {connect} from 'react-redux';

//Components
import ArticleCard from '../../containers/ArticleCard';

class Browse extends React.Component {

    state = {
        search:'',
        result: []
    }

    render(){
        return(
            <main role="main" className="container">
                <h1 className="mt-5 mb-5">Rechercher un article</h1>
                <form className="row pb-3 border-bottom" onSubmit={e => this.handleSearch(e)}>
                    <label htmlFor="search" className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="search" placeholder="Rechercher par mot-clefs" autoFocus onChange={e => this.setState({ search: e.target.value })}/>
                    </div>
                    <div className="col-sm-4">
                        <input type="submit" className="btn btn-success" value="Rechercher"/>
                    </div>
                </form>
                <div className="row pt-3">
                    {this.state.result.map(article => 
                    <ArticleCard  key={article.id} article={article} />)}
                </div>
            </main>
        )
    }

    handleSearch(e){
        e.preventDefault();
        if(this.props.articles.length > 0){
            const {articles} = this.props;
            this.setState({result: articles.filter(article => article.title.includes(this.state.search))})
            console.log("Articles",this.state);
        }
    }
}


function mapStateToProps(store){
    return{
        articles: store.articles
    }
}

export default connect(mapStateToProps)(Browse);