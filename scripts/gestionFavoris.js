
// format du JSON : {title : {"artist" : ..., "cover_url" : ...}}
class Favori {
    title; 
    artists = [];
    cover_url;
    constructor(full_title, artist_names, header_image_thumbnail_url, lyrics_url){
        this.title = full_title;
        this.artists = artist_names;
        this.cover_url = header_image_thumbnail_url;
        this.lyrics_url = lyrics_url;
    }

    get_title(){
        return this.title;
    }
    get_artist(){
        return this.artists;
    }
    get_cover_url(){
        return this.cover_url;
    }
}

let favoris = JSON.parse(localStorage.getItem("favoris"));

console.log("FAVORIS : " + favoris);
if(favoris == null){
    favoris = {};
    ajoutFavori("");

    localStorage.setItem("favoris", JSON.stringify(favoris));
    console.log("LISTE FAVORIS VIDE");
}
setupFavoris();


function setupFavoris(){
    
    let resultatDiv = document.getElementById('favoris-liste');
        resultatDiv.innerHTML = "";
        Object.keys(favoris).forEach(title => {
            console.log(favoris[title]["lyrics_url"]);
            const musiqueHTML = `
                <div class="musique">
                    <img src="${favoris[title]["cover_url"]}" alt="${title}" width="100">
                    <h3>${title}</h3>
                    <p>Artistes : ${favoris[title]["artistes"]}</p>
                    <a href="${favoris[title]["lyrics_url"]}" target="_blank">Voir sur Genius</a>
                </div>
            `;
            resultatDiv.innerHTML += musiqueHTML;
        });
    
    console.log(favoris);
}

function ajoutFavori(musique){
    //const newFav.artists, newFav.cover_url, newFav.lyrics_url]= new Favori(musique["full_title"], musique["artist_names"], musique["header_image_thumbnail_url"], musique["url"]);
    const newFav = new Favori("BLABLACAR", "Tchoupi", "https://images.genius.com/0087672cc369b9e7489f35940125bc9a.300x300x1.jpg", "https://genius.com/Drake-in-my-feelings-lyrics");

    console.log(newFav);
    

    favoris[newFav.title] = {"artistes": newFav.artists, "cover_url": newFav.cover_url, "lyrics_url": newFav.lyrics_url};
    console.log("FAVORIS : " + favoris);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    //Update l'affichage
    setupFavoris();
}

function supprimerFavori(title){
    //Chercher dans les favoris le nom pour le suppr
    if (favoris[title]) {
        //Supprimer la musique des favoris
        delete favoris[title];
        //Update dans le local storage
        localStorage.setItem("favoris", JSON.stringify(favoris));
        //Update l'affichage
        setupFavoris();
    }
    
}




