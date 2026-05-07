const detailsContainer =
document.getElementById("detailsContainer");

/* GET NEWS DATA */

const newsData =
JSON.parse(localStorage.getItem("newsData"));

const selectedIndex =
localStorage.getItem("selectedIndex");

const article = newsData[selectedIndex];

/* DISPLAY DETAILS */

detailsContainer.innerHTML = `

    <img src="${article.image}" alt="news-image">

    <h1>${article.title}</h1>

    <p>
        ${article.content || article.description}
    </p>

    <p>
        <strong>Source:</strong>
        ${article.source.name}
    </p>

    <p>
        <strong>Published:</strong>
        ${article.publishedAt}
    </p>

    <a href="${article.url}" target="_blank">
        Read Full Article
    </a>

`;