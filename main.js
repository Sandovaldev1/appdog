//agregamos las variables que almacenan las direcciones de API

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=6&api_key=live_XIoI1rqoLF3KP7J7jYRaBy8LbMARJ5GKZieFeyTtWJatMW7alPqDX0H4ApHrKP7u';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?api_key=live_XIoI1rqoLF3KP7J7jYRaBy8LbMARJ5GKZieFeyTtWJatMW7alPqDX0H4ApHrKP7u';
const API_URL_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_XIoI1rqoLF3KP7J7jYRaBy8LbMARJ5GKZieFeyTtWJatMW7alPqDX0H4ApHrKP7u`;

//generamos una variable para indicarnos si hay un error al momento de hacer solicitudes
const spanError= document.getElementById('Error');

//Creamos una funcion para que se carguen imagenes ramdom de la API
    
async function loadRandomDogs () {

    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log(data);
    //creamos una condicional para validar que no haya errores
    if(res.status !== 200) { 
        spanError.innerHTML = "Error: " + data.message;
    }
    else{

        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const img5 = document.getElementById('img5');
        const img6 = document.getElementById('img6');
        const btn1 = document.getElementById('favoriteButton');
        const btn2 = document.getElementById('favoriteButton2');
        const btn3 = document.getElementById('favoriteButton3');
        const btn4 = document.getElementById('favoriteButton4');
        const btn5 = document.getElementById('favoriteButton5');
        const btn6 = document.getElementById('favoriteButton6');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;
    img6.src = data[5].url;

    btn1.onclick= () => saveFavoritesDogs(data[0].id);
    btn2.onclick= () => saveFavoritesDogs(data[1].id);
    btn3.onclick= () => saveFavoritesDogs(data[2].id);
    btn4.onclick= () => saveFavoritesDogs(data[3].id);
    btn5.onclick= () => saveFavoritesDogs(data[4].id);
    btn6.onclick= () => saveFavoritesDogs(data[5].id);
}
}



//Creamos una funcion que muestra las imagenes marcadas en favoritas
async function loadFavoritesDogs() {

    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();

    console.log(data);
        //creamos una condicional para validar que no haya errores
        if(res.status !== 200) { 
            spanError.innerHTML = "Error: " + data.message;
        } else{

            const section = document.getElementById('favoriteDog');
            section.innerHTML="";
            const h2 = document.createElement('h2');
            const h2Text = document.createTextNode('Imagenes favoritas');
            h2.appendChild(h2Text);
            section.appendChild(h2);



            data.forEach( dog=> {

                
                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Eliminar de favoritos');


                
                //devolvemos y hacemos llamado a las variables
                img.src = dog.image.url
                btn.appendChild(btnText);
                btn.onclick= () => deleteFavoriteDog(dog.id);
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article);
            });

        }
}

//Creamos una funcion que guarda las imagenes marcadas en favoritas

async function saveFavoritesDogs(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
    },
        body: JSON.stringify({
            image_id:id
        }),
        
    });
    const data = await res.json();
    console.log("se salvo");
    console.log(res);
    console.log(data);
        //creamos una condicional para validar que no haya errores
        if(res.status !== 200) { 
            spanError.innerHTML = "Error: " + data.message;
        }else {
            
            loadFavoritesDogs();
          }
}

async function deleteFavoriteDog(id) {
    const res = await fetch(API_URL_DELETE(id), {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log("se borro");
    loadFavoritesDogs();
 };

const reloadButton = document.getElementById("Mybuton");
reloadButton.onclick = loadRandomDogs;



loadRandomDogs();
loadFavoritesDogs();








////////////////////////////////

