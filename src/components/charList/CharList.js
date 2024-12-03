import {Component} from "react";
import './charList.scss';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        char: [],
        loading: true,
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }

    onCharactersLoaded = (characters) => {
        this.setState({
            char: characters,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
        console.error("Failed to fetch characters.");
    };



    renderItems = (arr) => {

        // console.log(this.marvelService)

        const newItems = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};

            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit': 'unset'};
            }

            return(
                <li key={item.id}
                    className='char__item'
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )

        })

        return(
            <ul className="char__grid">
                {newItems}
            </ul>
        )
    }



    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner /> : null;
        const charList = !loading && !error ? this.renderItems(char) : null;

        return (
            <div className="char__list">

                {errorMessage || spinner || charList}



                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;