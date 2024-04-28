document.querySelector(".btn-primary").addEventListener("click",function(){
    var i =$("html").attr("data-bs-theme");
    if(i=="dark"){
        $("html").attr("data-bs-theme","light");
        document.querySelector(".btn-primary").innerHTML="Light Mode";
    }
    else{
        $("html").attr("data-bs-theme","dark");
        document.querySelector(".btn-primary").innerHTML="Dark Mode";
    }
})

fetch("https://api.jikan.moe/v4/anime").then(
    res => {
        return res.json()
    }
).then(data => {
    
    // console.log(data.data.length)
    data.data.forEach(id => {
        console.log(id.mal_id)
        var link = "https://api.jikan.moe/v4/anime/" + id.mal_id;
        setTimeout(
            fetch(link).then(
                res => {
                    return res.json()
                }
            ).then(
                data => {
                    const title = data.data.title;
                    console.log(data);
                    const poster_url = data.data.images.jpg.large_image_url
                    const poster = `<span><img class="pic" src="${poster_url}" alt="The poster"></span>`

                    // To add video in the file

                    // const trailer_url=data.data.trailer.embed_url
                    // const trailer=`<iframe width="420" height="345"  src="${trailer_url}" ></iframe>`
                    
                   // $('.img').after(`<span class="animeTitle">${title}</span>`);
                    
                    //different way to add
                    // document.querySelector('.img').insertAdjacentHTML( "beforeend",`<h1>${title}</h1>`);
                    
                    // $('.img').append(poster);

                    // document.querySelector('.img').insertAdjacentHTML("beforeend", poster);
                    // document.querySelector('.img').insertAdjacentHTML("beforeend",trailer)
                    // //'<iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">'
                    var gen=[];

                    $('.format').append(`
                     <span class="card" style="width: 25rem;">
                    <img src="${poster_url}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                      <h2 class="card-title animeTitle">${title}</h2>
                      <p class="card-text">${data.data.synopsis}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Episodes: ${data.data.episodes}</li>
                      <li class="list-group-item">Rating: ${data.data.rating}</li>
                      <li class="list-group-item">Score: ${data.data.score}</li>
                      <li class="list-group-item">Studios: ${data.data.studios[0].name}</li>
                      <li class="list-group-item">Geners: ${data.data.genres[0].name}</li>
                    </ul>
                    <div class="card-body">
                      <a href="${data.data.url}" class="card-link">Learn More</a>
                      <a href="${data.data.trailer.embed_url}" class="card-link">Trailer</a>
                    </div>
                  </span>   `)


                }
            )
     ,1000
        )
    });
    console.log(data)
}
)
// $('.animeTitle').css({
//     "width":"500px",
//     "background-color":"white",
//     "padding":"50px",
//     "margin-bottom":"10px"
// });


