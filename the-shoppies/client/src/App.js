import React from 'react';
import axios from 'axios'
import './App.css';
import Result from './components/results/results';
import AddedList from './components/addedList/addedList';
import Banner from 'react-js-banner';
import './App.scss';

class App extends React.Component {
  state = {
    movie : [] ,
    searchVal : "" ,
    nominatedMovie : [] ,
    nominatedList : []
  }

  componentDidMount () {
    if ( localStorage.getItem('List-of-Nominations') ) {
      const nominatedList = JSON.parse( localStorage.getItem('List-of-Nominations') )
      this.setState({
        nominatedList : nominatedList
      })
    } else {
      return null;
    }
  }
  
  search = e => {
    let searchValue = e.target.value.toLowerCase();
    axios.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=cd817c84&`)
         .then( res => {
              this.setState({
                movie : res.data.Search,
                searchVal : searchValue
              })
          })
         .catch( err => {
              alert( "Error :" , err )
          }) 
  }

  removeNominatedMovie = (nominatedMovie) => {
    const newMovies = this.state.nominatedList.filter( item => item.id !== nominatedMovie.id );
    localStorage.setItem('List-of-Nominations' , JSON.stringify(newMovies))
    this.setState({ nominatedList : newMovies })
  }

  selectNominatedMovie = ( nominatedmovie ) => {
    if((this.state.nominatedList).length < 5){
        this.setState( state => {
        const nominatedList = state.nominatedList.concat(nominatedmovie)
        localStorage.setItem('List-of-Nominations' , JSON.stringify(nominatedList))
          return {
            nominatedList
          }
        })
    } else {
          alert( "Please select no more than 5 Nominees" );
        }
  }
  
  isMovieNominated = (movie) => {
    const { nominatedList } = this.state;
    return !!nominatedList.find(item => item.id === movie.imdbID)
  }

  result(){
    let result;
    if(!this.state.movie){
      result = <p>No Results Found</p>
    }else{
      console.log(this.state.nominatedList);
      result = this.state.movie.map(movie=>{
        if(this.isMovieNominated(movie)){
          return(
            <Result
            id={movie.imdbID}
            name={movie.Title}
            year={movie.Year}
            disabled= {true}
            onSelect = {this.selectNominatedMovie}
            nominatedList = {this.state.nominatedList}
          />)
        }else{
          return(
            <Result
            id={movie.imdbID}
            name={movie.Title}
            year={movie.Year}
            disabled= {false}
            onSelect = {this.selectNominatedMovie}
            nominatedList = {this.state.nominatedList}
          />)
        }
    })
    }
    return result
  }

  list(){
    let list;
    if(!this.state.nominatedList){
      list = <p>No Nominated Movie</p>
    }else{
      list= this.state.nominatedList.map(movie=>{
        return(
          <AddedList
            id = {movie.id}
            name={movie.name}
            onRemove = {() => this.removeNominatedMovie(movie)}
          />
        )
      })
    }
    return list
  }

  banner = () => {
    if((this.state.nominatedList).length === 5 ){
      return (
        <Banner
          title = "You have selected your nominations"
          css={this.state.banner3Css}
        />
      )
    } else {
      return null;
    }
  }


  render(){
    return (
      <div className="main">
        {
          this.banner()
        }
        <h1 className="main__title">The Shoppies</h1>
        <div className="search">
          <h4 className="search__title">Movie Title</h4>
          <input className="search__input" onChange={this.search}></input>
        </div>
        <div className="result">
          <div className="result__display">
            <h4 className="result__title">Results for "{this.state.searchVal}"</h4>
            {
              this.result()
            }
          </div>
          <div className="result__added">
            <h4 className="result__title">Nominations</h4>
            {this.list()}
          </div>
        </div>
      </div>
    )
    }
}

export default App;
