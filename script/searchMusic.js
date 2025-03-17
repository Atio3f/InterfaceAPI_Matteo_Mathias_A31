const accessToken = 'hssnQuuDbZj5QUuW4ooRb7ZRX7230tPiKQ-Xj2IBGuKRW0XnU30zEgYexIpXNk_T'; 

async function rechercheDeMusique(nomMusique) {
    const url = `https://api.genius.com/search?q=$` + nomMusique + `&access_token=` + accessToken;

    const reponse = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const donneesMusique = await reponse.json();
    console.log(donneesMusique);
}

rechercheDeMusique('Hello Adele');
