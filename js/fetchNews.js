import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

/* LOGIN TRACKING */
let isLoggedIn = false;

// Check user authentication status on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        isLoggedIn = true;
        // Only fetch initial news if the user is logged in
        fetchNews();
    } else {
        isLoggedIn = false;
        // Optional: Show a message in the container for guests
        newsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">
            Please <a href="signup.html">Create an Account</a> or <a href="login.html">Login</a> to view the latest news.
        </p>`;
    }
});

/* FETCH NEWS FUNCTION */
async function fetchNews(
    query = "breaking news",
    country = "in",
    page = 1
){
    // Safety check: Don't fetch if already loading or if user is not logged in
    if(isLoading || !isLoggedIn) return;
    isLoading = true;

    try {
        const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${query}&country=${country}&language=en`;

        const response = await fetch(url);
        const data = await response.json();

        displayNews(data.results);

    } catch(error) {
        console.error("Fetch Error:", error);
        newsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Error loading news. Please try again later.</p>`;
    }

    isLoading = false;
}

/* DISPLAY NEWS */
function displayNews(results) {
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

/* SEARCH NEWS - WITH REDIRECT LOGIC */
searchBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
        // Redirect guest users to signup page
        alert("Please create an account to use the search feature!");
        window.location.href = "signup.html";
        return;
    }

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
    // Only allow changing filters if logged in
    if (!isLoggedIn) return;

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
        isLoggedIn && // Only scroll if logged in
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
    ) {
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

// Change the guest message line to this:
newsContainer.innerHTML = `
    <div class="auth-prompt">
        <p>Please <a href="signup.html">Create an Account</a> or <a href="login.html">Login</a> to view the latest news.</p>
    </div>
`;