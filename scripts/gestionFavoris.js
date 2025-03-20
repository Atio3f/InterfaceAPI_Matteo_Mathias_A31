
const favoris = JSON.parse(localStorage.getItem("favoris"));

localStorage.setItem("favoris", JSON.stringify(favoris));


function ajoutFavori(musique){
    const newFav = new Favori(musique["full_title"], musique["artist_names"], musique["header_image_thumbnail_url"], musique["url"]);
    console.log(newFav);
}

function supprimerFavori(title){
    //Chercher dans les favoris le nom pour le suppr
}

// format du JSON : {title : {"artist" : ..., "cover_url" : ...}}
class Favori {
    title; 
    artist = [];
    cover_url;
    constructor(full_title, artist_names, header_image_thumbnail_url, lyrics_url){
        this.title = full_title;
        this.artist = artist_names;
        this.cover_url = header_image_thumbnail_url;
        this.lyrics_url = lyrics_url;
    }

    get_title(){
        return this.title;
    }
    get_artist(){
        return this.artist;
    }
    get_cover_url(){
        return this.cover_url;
    }
}



