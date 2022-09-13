import React from 'react';
import Swal from 'sweetalert2';

var Axios = require('axios')

class Home extends React.Component{
    constructor(){
        super();

        this.state = {
            "movieList": []
        }
    }

    movieLine(movieObject){
        return ( <div className='Movie'>
            <div className='ImageContainer'>
                <img className="MovieImage" src={movieObject['image_url']}></img>
            </div>
            <div className="MovieInfo">
                <div className="MovieHeading">
                    {movieObject['original_name']}
                </div>
                <div className="Date">
                    {movieObject['date']}
                </div>
                <div className="Minutes">
                    {movieObject['minutes'] + " Minutes"}
                </div>
                {/* <div className="Imdb URL">
                    {movieObject['imdb_url']}
                </div> */}
                <div className='Genres'>
                    {movieObject['genres'].map( (key, value) => <div className="GenreName">{movieObject['genres'][value]}</div> )}
                </div>

                <div className="Remove" onClick={()=> this.removeMovie(movieObject['original_name'])}>
                    Remove
                </div>
            </div>

        </div> )
    }

    render(){
        const movies = this.state['movieList']

        return <div className='HomePage'>
            <div className="HomeHeader"> Welcome to your MOVIE SPACE esmoshqo</div>
            <div className="AddMovieButton" onClick={() => this.addMovie()}> Add Movie </div>
            <div className="Movies">
                {
                    movies.map( (key, value) => this.movieLine(movies[value]))
                }
            </div>
            <div onClick={()=> console.log(this.state)}> CHECK </div>
        </div>
    }

    fetchData(){
        Axios({
            method: 'post',
            url: "http://3.72.0.176:8080/take_movies",
        }).then(movies_response => {
            this.setState(()=>({"movieList": movies_response.data.movies}))
        })
    }

    removeMovie(name){
        Axios({
            method: "post",
            url: "http://3.72.0.176:8080/remove_movie",
            data: {"original_name": name}
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }


    addMovie(){
        Swal.fire({
            title: "Submit IMDB url",
            input: 'text',
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Add Movie",
            showLoaderOnConfirm: true,
            preConfirm: (imdbURL) => {
                return Axios({
                    method: "post",
                    url: "http://3.72.0.176:8080/add_movie",
                    data: {"url": imdbURL}
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result)=> {
            console.log(result)
        })
    }

    componentDidMount(){
        this.fetchData();
    }
}

export default Home

