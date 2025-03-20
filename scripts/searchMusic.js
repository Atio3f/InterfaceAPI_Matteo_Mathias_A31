const accessToken = 'hssnQuuDbZj5QUuW4ooRb7ZRX7230tPiKQ-Xj2IBGuKRW0XnU30zEgYexIpXNk_T'; 


async function rechercheDeMusique() {
    const nomMusique = "for";//document.getElementById("utilisateurInput").value;
    if(nomMusique != ""){
        const url = `https://api.genius.com/search?q=${nomMusique}&access_token=${accessToken}`;

        const reponse = await fetch(url, {
            method: 'GET',
        });
        const donneesMusique = await reponse.json();
        const musique = donneesMusique.response.hits[0].result;
        console.log(donneesMusique);
        ajoutFavori(musique);
        //return donneesMusique;
    }else{
        console.log("error");
        //return "error";
    }
    
} 
rechercheDeMusique();