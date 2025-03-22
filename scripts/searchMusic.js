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
        resultatDiv.innerHTML = "";
            donneesMusique.response.hits.forEach(hit => {
            const musique = hit.result;
            const musiqueHTML = `
                <div class="musique">
                    <img src="${musique.song_art_image_url}" alt="${musique.full_title}" width="100">
                    <h3>${musique.full_title}</h3>
                    <p>Artiste : ${musique.artist_names}</p>
                    <a href="${musique.url}" target="_blank">Voir sur Genius</a>
                </div>
            `;

            resultatDiv.innerHTML += musiqueHTML;
        });
        
       
        
    }else{
        console.log("error");
        
    }
    
} 
rechercheDeMusique();

function bindKeyup() {
    document.getElementById("utilisateurInput").addEventListener("keyup", function (e) {
        if (e.key === "Enter" && document.getElementById("utilisateurInput").value != null) { 
            rechercheDeMusique();
        }
    });
}

bindKeyup();
