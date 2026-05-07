const API_KEY = "fd5fe279d8ac46c4f4844a4c1140b0d8";

const newsContainer =
document.getElementById("newsContainer");

const countrySelect =
document.getElementById("country");

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

/* PAGE NUMBER */

let currentPage = 1;

/* CURRENT QUERY */

let currentQuery = "breaking news";

/* LOADING CONTROL */

let isLoading = false;

/* FETCH NEWS FUNCTION */

async function fetchNews(
    query = "breaking news",
    country = "in",
    page = 1
){

    if(isLoading) return;

    isLoading = true;

    try{

        const url =
`https://gnews.io/api/v4/search?q=${query}&lang=en&country=${country}&max=10&page=${page}&apikey=${API_KEY}`;

        const response =
        await fetch(url);

        const data =
        await response.json();

        displayNews(data.articles);

    }catch(error){

        console.log(error);

    }

    isLoading = false;

}

/* DISPLAY NEWS */

function displayNews(articles){

    articles.forEach((article) => {

        const card =
        document.createElement("div");

        card.classList.add("news-card");

        card.innerHTML = `

            <img
                src="${article.image || 'https://via.placeholder.com/300'}"
                alt="news image"
            >

            <div class="news-content">

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.description || "No description available"}
                </p>

                <a
                    href="${article.url}"
                    target="_blank"
                >
                    Read More
                </a>

            </div>

        `;

        newsContainer.appendChild(card);

    });

}

/* INITIAL NEWS */

fetchNews();

/* SEARCH NEWS */

searchBtn.addEventListener("click", () => {

    newsContainer.innerHTML = "";

    currentPage = 1;

    currentQuery =
    searchInput.value || "breaking news";

    fetchNews(
        currentQuery,
        countrySelect.value,
        currentPage
    );

});

/* COUNTRY CHANGE */

countrySelect.addEventListener("change", () => {

    newsContainer.innerHTML = "";

    currentPage = 1;

    fetchNews(
        currentQuery,
        countrySelect.value,
        currentPage
    );

});

/* INFINITE SCROLL */

window.addEventListener("scroll", () => {

    if(

        window.innerHeight +
        window.scrollY

        >=

        document.body.offsetHeight - 500

    ){

        currentPage++;

        fetchNews(
            currentQuery,
            countrySelect.value,
            currentPage
        );

    }

});