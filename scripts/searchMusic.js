const accessToken = 'hssnQuuDbZj5QUuW4ooRb7ZRX7230tPiKQ-Xj2IBGuKRW0XnU30zEgYexIpXNk_T'; 


async function rechercheDeMusique() {
    const nomMusique = document.getElementById("utilisateurInput").value;
    if(nomMusique != ""){
        const url = `https://api.genius.com/search?q=${nomMusique}&access_token=${accessToken}`;

        const reponse = await fetch(url, {
            method: 'GET',
        });
        const donneesMusique = await reponse.json();
        const musique = donneesMusique.response.hits[0].result;
        console.log(donneesMusique);
        console.log(musique);
        console.log(musique.full_title);
        let resultatDiv = document.getElementById('main');
        resultatDiv.classList.add("fit-content");
        resultatDiv.innerHTML = "<h1>Meilleurs Résultats :</h1>";
            donneesMusique.response.hits.forEach(hit => {
            const musique = hit.result;
            const musiqueHTML = `
<div class="musiqueBloc" data-musique='${JSON.stringify(musique)}'>                    <img src="${musique.song_art_image_url}" alt="${musique.full_title}" width="100">
                    <div>
                    <h3>${musique.full_title}</h3>
                    <p>Artiste : ${musique.artist_names}</p> 
                       <div>
                </div>
            `;

            resultatDiv.innerHTML += musiqueHTML;
        });
        document.querySelectorAll(".musiqueBloc").forEach(div => {
            const musique = JSON.parse(div.getAttribute("data-musique"));

            div.addEventListener("click", function () {
                console.log("Objet JSON du morceau cliqué :", musique);
            });

            document.querySelectorAll(".musiqueBloc").forEach(div => {
                
                const musique = JSON.parse(div.getAttribute("data-musique"));
                div.addEventListener("click", function () {
                    afficherDetails(musique);
                });
            });
        });
    }else{
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

bindKeyup();
