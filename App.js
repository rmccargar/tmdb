/*
You're in charge of managing the development of the new TMDB mobile application. The deadline
is almost here, and your developer quits! You can tell the board that you can't deliver the
project, or you can finish it yourself. Luckily, you took an awesome introduction to software
development course in b-school. You've got this.
To-do:
- When a movie title is entered into the text field, figure out how to capture the value that's
  typed in the state object.
- When the return key is pressed, use the value that's typed by the user to call the TMDB API
  (already done), and store the first result in state. Pass this object (via props) to the Movie
  component (already written, but hard-coded), and display the movie's poster, backdrop, title,
  rating (average vote) and overview. In addition, clear out the existing search term so that
  it reads "Enter a movie name!" instead of the movie you just searched for.
Hints:
- Read the React documentation on the TextInput component –
  https://facebook.github.io/react-native/releases/0.28/docs/textinput.html – pay particular
  attention to the onChangeText (event that occurs when typing into the TextInput) and also
  onSubmitEditing (event that occurs when the user presses the return key) - write event handler
  functions for both!
- Styles are already written and applied, so there's no need to modify them, unless
  you want to!
*/

import React from 'react';
import { Image, TextInput, Text, View, StyleSheet } from 'react-native';

class Movie extends React.Component {
  render() {
    return (
      <View style={styles.movie}>
        <Image style={styles.backdrop}
               source={{uri: "http://image.tmdb.org/t/p/w500" + this.props.movie.backdrop_path}} />
        <View style={styles.posterContainer}>
          <Image style={styles.poster} source={{uri: "http://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}} />
        </View>
        <View style={styles.titleAndVotes}>
          <Text style={styles.title}>{this.props.movie.title}</Text>
          <Text style={styles.votes}>{this.props.movie.vote_average.toFixed(1)}</Text>
        </View>
        <Text style={styles.overview}>{this.props.movie.overview}</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movieNameInput: "",
      movie: null
    }
  }

 movieNameInputChanged = (text) => {
    this.setState( { movieNameInput: text} );
  }

 movieNameInputSubmitted = () => {
    console.debug("the input is: " + this.state.movieNameInput +" the movie is: " + this.state.movie )
    // Make the TMDB API call and receive results
    const apiKey = 'e9743662f5a39568d8e25225f2c97e09'

   let url = "http://api.themoviedb.org/3/search/movie?query=" + this.state.movieNameInput
    url    += "&api_key=" + apiKey
    url    += "&language=en-US&page=1&include_adult=false"

   fetch(url).then(response => response.json()).then(json => {
      console.log(json)
      this.setState({ movie: json.results[0]
       });
       console.debug("the movie is now: " + this.state.movie)
      });
  }

 render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.movieNameInput}
                   placeholder="Enter a movie name!"
                   placeholderTextColor="#aaa"
                   onChangeText={this.movieNameInputChanged}
                   onSubmitEditing={this.movieNameInputSubmitted}
                   value={this.state.movie}
                   autoFocus={true} />

       {/* If there's a movie, use the Movie component to show it  */}

       {this.state.movie && <Movie movie={this.state.movie} />}

     </View>
    );
  }
}

// Styles. OK to leave alone, unless creativity strikes.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  movieNameInput: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    height: '100%',
    borderWidth: 0,
    fontSize: 26,
    fontWeight: '300',
    textAlign: 'left',
    paddingLeft: 20
  },
  movie: {
    flex: 7,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.3
  },
  posterContainer: {
    flex: 4
  },
  poster: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover'
  },
  titleAndVotes: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'transparent'
  },
  title: {
    color: '#fff',
    flex: 4,
    fontSize: 30,
    fontWeight: '300'
  },
  votes: {
    color: '#fff',
    flex: 1,
    fontSize: 20,
    backgroundColor: '#F300CE',
    padding: 4,
    textAlign: 'center'
  },
  overview: {
    flex: 3,
    color: '#fff',
    width: 360,
    fontSize: 17,
    fontWeight: '300',
    lineHeight: 23,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'transparent'
  }
});
