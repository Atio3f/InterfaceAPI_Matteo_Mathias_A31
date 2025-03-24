


async function jeuGenius() {
    let utilisateurReponse = prompt("Entrez le nom de l'artiste :");
    const url = `https://api.genius.com/search?q=${utilisateurReponse}&access_token=${accessToken}`;
    const reponse = await fetch(url, { method: 'GET' });
    const donneesMusique = await reponse.json();
    console.log(donneesMusique);
    let musique = donneesMusique.response.hits;

        
        let resultatDiv = document.getElementById('main');
        resultatDiv.classList.add("fit-content");
        resultatDiv.innerHTML = `
            <h1>Essayez de deviner le top 3 des morceaux de ${utilisateurReponse}</h1>
            <div>
                <h3>Top 1 : <input id="input1" type="text"></h3>
                <h3>Top 2 : <input id="input2" type="text"></h3>
                <h3>Top 3 : <input id="input3" type="text"></h3>
                <button id="submitBtn">Valider</button>
            </div>
        `;

        document.getElementById('submitBtn').addEventListener('click', function() {
            const input1 = document.getElementById("input1").value.trim();
            const input2 = document.getElementById("input2").value.trim();
            const input3 = document.getElementById("input3").value.trim();
            const results = [input1, input2, input3];
            const correct = [musique[0].result.title, musique[1].result.title, musique[2].result.title];
            let score = 0;

            results.forEach((input, index) => {
                if (input.toLowerCase() === correct[index].toLowerCase()) {
                    score++;
                }
            });

   
            alert(`Votre score : ${score}/3`);
            if (score === 3) {
                alert("Bien joué !");
            } else {
                alert("Dommage, essayez encore !");
            }
        });
}
