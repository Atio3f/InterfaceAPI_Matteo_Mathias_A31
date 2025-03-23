const accessToken = 'hssnQuuDbZj5QUuW4ooRb7ZRX7230tPiKQ-Xj2IBGuKRW0XnU30zEgYexIpXNk_T'; 
const sauvegarde = document.getElementById("main").innerHTML;

async function rechercheDeMusique() {
    const nomMusique = document.getElementById("utilisateurInput").value;
    if (nomMusique != "") {
        const url = `https://api.genius.com/search?q=${nomMusique}&access_token=${accessToken}`;

        const reponse = await fetch(url, { method: 'GET' });
        const donneesMusique = await reponse.json();
        
        let resultatDiv = document.getElementById('main');
        resultatDiv.classList.add("fit-content");
        resultatDiv.innerHTML = "<h1>Meilleurs Résultats :</h1>";

        donneesMusique.response.hits.forEach(hit => {
            const musique = hit.result;
            const musiqueBloc = document.createElement("div");
            musiqueBloc.classList.add("musiqueBloc");
            musiqueBloc.dataset.musique = JSON.stringify(musique);

            musiqueBloc.innerHTML = `
                <img src="${musique.song_art_image_url}" alt="${musique.full_title}" width="100">
                <div>
                    <h3>${musique.full_title}</h3>
                    <p>Artiste : ${musique.artist_names}</p> 
                </div>
                <img class="clickable" src="${favoris[musique.full_title] ?"img/favorited-icon.png" : "img/favorite-icon.png"}" width="50"/>
            `;

            musiqueBloc.addEventListener("click", function () {
                afficherDetails(musique);
            });

            const favIcon = musiqueBloc.querySelector(".clickable");
            favIcon.addEventListener("click", function (event) {
                event.stopPropagation();

                if (!favoris[musique.full_title]) {
                    const newfavori = new Favori(musique.full_title, musique.artist_names, musique.header_image_thumbnail_url, musique.url);
                    favIcon.src = "img/favorited-icon.png";
                    ajoutFavori(newfavori);
                } else {
                    if (confirm("Voulez-vous supprimer ce favori ?")) {
                        favIcon.src = "img/favorite-icon.png";
                        supprimerFavori(musique.full_title);
                    }
                }
            });

            resultatDiv.appendChild(musiqueBloc);
        });
    } else {
        console.log("error");
    }
}

async function afficherDetails(musique) {
    
    const chansonId = musique.id;
    const urlParoles = `https://api.genius.com/songs/${chansonId}?access_token=${accessToken}`;
    
    const reponseParoles = await fetch(urlParoles);
    const donneesParoles = await reponseParoles.json();
    
    const parolesUrl = donneesParoles.response.song.path;
    const parolesPage = `https://genius.com${parolesUrl}`;  

    let detailDiv = document.getElementById('main');
    detailDiv.innerHTML = `
        <div class="descriptionSon">
        <img src="${musique.song_art_image_url}" alt="${musique.full_title}" width="200">
        <h1>${musique.full_title}</h1>
        <div>
        <div>
        <p><strong>🎤Artiste:</strong> ${musique.artist_names}</p>
        <p><strong>👀Vues:</strong> ${musique.stats.pageviews}</p>
        </div>
        <div>
        <p><strong>📅Date de sortie:</strong> ${musique.release_date_for_display}</p>
        <p><strong>📝Annotations:</strong> ${musique.stats.unreviewed_annotations} annotations non révisées</p>
        </div>
        </div>
        <a href="${parolesPage}" target="_blank">Voir les paroles complètes</a>
        <h2>En savoir plus sur ${musique.primary_artist_names}</h2>
        
        <img src="${musique.primary_artist.header_image_url}" alt="Image de l'artiste" width="150">
 
        <a href="https://genius.com/artists/${musique.primary_artist.id}" target="_blank">Page de l'artiste</a>
        </div>
    `;
}



function bindKeyup() {
    document.getElementById("utilisateurInput").addEventListener("keyup", function (e) {
        if (e.key === "Enter" && document.getElementById("utilisateurInput").value != null) { 
            rechercheDeMusique();
        }
    });
}

/*async function getParoles(titre, artiste) {
    const url = `https://api.lyrics.ovh/v1/${artiste}/${titre}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.lyrics) {
        return data.lyrics;
    } else {
        return "Paroles non disponibles.";
    }
}
getParoles("Travis Scott","FEIN");*/

function home(){

    let contenuMainHTML = sauvegarde; 
    main.innerHTML = contenuMainHTML; 
}


bindKeyup();
