const accessToken = 'hssnQuuDbZj5QUuW4ooRb7ZRX7230tPiKQ-Xj2IBGuKRW0XnU30zEgYexIpXNk_T'; 
const sauvegarde = document.getElementById("main").innerHTML;
let historiquemusique = new Array(5);
let index = 0;

const utilisateurInput = document.getElementById("utilisateurInput");
const historiqueDiv = document.getElementById("historique"); 

utilisateurInput.addEventListener("click", function() {
    historique();
    autoCompletion();
});

    document.addEventListener("click", function(event) {
        if (!utilisateurInput.contains(event.target) && !historiqueDiv.contains(event.target)) {
            historiqueDiv.style.display = "none";  
        }
    });

    utilisateurInput.addEventListener("keyup", function(e) {
        if (e.key === "Enter") {
            historiqueDiv.style.display = "none";
        }
    });



async function rechercheDeMusique() {
    const nomMusique = document.getElementById("utilisateurInput").value;
    if (nomMusique != "") {
        const url = `https://api.genius.com/search?q=${nomMusique}&access_token=${accessToken}`;

        const reponse = await fetch(url, { method: 'GET' });
        const donneesMusique = await reponse.json();
        ajouterMusique(nomMusique);
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
                    <h3>${musique.title_with_featured}</h3>
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
            <div>
                <img src="${musique.song_art_image_url}" alt="${musique.full_title}" width="200"> 
            </div>
            <div>
                <h1>${musique.full_title}</h1> 
                <img class="clickable-details" src="${favoris[musique.full_title] ?"img/favorited-icon.png" : "img/favorite-icon.png"}"/>

            </div>
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
            <div>
                <a href="${parolesPage}" target="_blank">Voir les paroles complètes</a>

            </div>
            <h2>En savoir plus sur ${musique.primary_artist_names}</h2>
            
            <img src="${musique.primary_artist.header_image_url}" alt="Image de l'artiste" width="150">
    
            <a href="${musique.primary_artist.url}}" target="_blank">Page de l'artiste</a>
        </div>
    `;

    const favIcon = detailDiv.querySelector(".clickable-details");
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
}



function bindKeyup() {
    document.getElementById("utilisateurInput").addEventListener("keyup", function (e) {
        if (e.key === "Enter" && document.getElementById("utilisateurInput").value != null) { 
            rechercheDeMusique();
            utilisateurInput.blur();
        }
    });
}

function home(){
    let contenuMainHTML = sauvegarde; 
    main.innerHTML = contenuMainHTML; 
    utilisateurInput.value = ""; 
}

function ajouterMusique(nomMusique) {
    if (!historiquemusique.includes(nomMusique)) {
        historiquemusique[index] = nomMusique; 
        index = (index + 1) % historiquemusique.length;
    }
}

function autoCompletion() {
    
    utilisateurInput.addEventListener("input", function () {
        let valeurChaine = utilisateurInput.value.toLowerCase();

        let suggestions = historiquemusique.filter(musique => 
            musique.toLowerCase().startsWith(valeurChaine)
        );

        historiqueDiv.innerHTML = "";

        
        suggestions.forEach(suggestion => {
            let p = document.createElement("p");
            p.textContent = suggestion;
            p.style.cursor = "pointer"; 
            historiqueDiv.appendChild(p);
        
            p.addEventListener("click", function() {
                utilisateurInput.value = suggestion;  
                historiqueDiv.style.display = "none";  
                rechercheDeMusique(suggestion);  
            });
        });

    });
    utilisateurInput.addEventListener("keydown", function (e) {
        if (e.key === "Tab") { 
            e.preventDefault(); 
            const suggestions = Array.from(historiqueDiv.querySelectorAll("p"));
            if (suggestions.length > 0) {
                const matchingSuggestions = suggestions.filter(suggestion => 
                    suggestion.textContent.toLowerCase().startsWith(utilisateurInput.value.toLowerCase())
                );
                if (matchingSuggestions.length > 0) {
                    utilisateurInput.value = matchingSuggestions[0].textContent;
                    historiqueDiv.style.display = "none";
                    rechercheDeMusique(utilisateurInput.value);
                    utilisateurInput.blur();
                }
            }
        }
    });
    
}

function historique() {
    historiqueDiv.style.display = "block"; 
    historiqueDiv.innerHTML = "";  
    
    for (let i = 0; i < historiquemusique.length; i++) {
        if (historiquemusique[i] !== undefined) {
            
            let p = document.createElement("p");
            p.textContent = historiquemusique[i];
            historiqueDiv.appendChild(p);

            p.addEventListener("click", function() {
                utilisateurInput.value = historiquemusique[i];
                historiqueDiv.style.display = "none"; 
                rechercheDeMusique(historiquemusique[i]);  
            });
        }
    }
}

bindKeyup();
