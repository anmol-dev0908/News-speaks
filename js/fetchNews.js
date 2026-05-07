const API_KEY = "pub_c319daa603ad48aa9811e6898d56b0bd";

const newsContainer = document.getElementById("newsContainer");
const countrySelect = document.getElementById("country");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

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

    try {
        // Updated URL for NewsData.io using HTTPS
        const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${query}&country=${country}&language=en`;

        const response = await fetch(url);
        const data = await response.json();

        // NewsData.io uses 'results' instead of 'articles'
        displayNews(data.results);

    } catch(error) {
        console.error("Fetch Error:", error);
        newsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Error loading news. Please try again later.</p>`;
    }

    isLoading = false;
}

/* DISPLAY NEWS */
function displayNews(results) {
    // Clear container before adding new results
    if (currentPage === 1) {
        newsContainer.innerHTML = "";
    }

    if (!results || results.length === 0) {
        if (currentPage === 1) {
            newsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No news found for this search.</p>`;
        }
        return;
    }

    results.forEach((article) => {
        const card = document.createElement("div");
        card.classList.add("news-card");

        // NewsData.io uses 'image_url' and 'link' instead of 'image' and 'url'
        card.innerHTML = `
            <img
                src="${article.image_url || 'https://via.placeholder.com/300'}"
                alt="news image"
            >
            <div class="news-content">
                <h3>${article.title || "No Title"}</h3>
                <p>${article.description ? article.description.substring(0, 100) + "..." : "No description available"}</p>
                <a
                    href="${article.link}"
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
    currentQuery = searchInput.value || "breaking news";

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
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
    ) {
        // Note: NewsData.io pagination works differently (using nextPage tokens)
        // For a basic fix, we prevent duplicate calls here.
        if (!isLoading) {
            currentPage++;
            fetchNews(
                currentQuery,
                countrySelect.value,
                currentPage
            );
        }
    }
});