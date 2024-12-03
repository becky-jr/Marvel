
class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=7b729205e470cb19de6c35b2f87e1be5';

    getResource = async (url) => {

        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    // getCharacterById = (id) => {
    //     return this.getResource(`${this._apiBase}characters/${id}/?${this._apiKey}`);
    // }

    getCharacterById = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        let description;
        if (char.description.length > 150) {
             description = char.description.slice(0, 150);
        } else if (!char.description) {
            description = 'Description not found';
        }

        return {
                id: char.id,
                name: char.name,
                description: description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage:char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
        };
    }

}

export default MarvelService;