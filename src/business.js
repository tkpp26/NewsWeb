import "./styles/style.css";
import "./styles/slideshow.css";
import "./styles/background.css";
import "./styles/typer.css";
import logoImage from "./images/logo.jpg";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;
const apiKey = process.env.API_KEY; // Assuming you set the API key elsewhere

async function fetchNews(category) {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const uniqueArticles = removeDuplicates(data.articles, "title");
    displayNews(
      uniqueArticles.filter(
        (article) => article.title !== "[Removed]" && article.urlToImage
      )
    );
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function fetchQuery(query) {
  const formattedQuery = query.replace(/\s+/g, "_"); // Replace spaces with underscores
  const url = `https://newsapi.org/v2/top-headlines?q=${formattedQuery}&from=${formattedDate}&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const uniqueArticles = removeDuplicates(data.articles, "title");
    displayNews(
      uniqueArticles.filter(
        (article) => article.title !== "[Removed]" && article.urlToImage
      )
    );
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function removeDuplicates(arr, prop) {
  return arr.filter(
    (obj, index, self) =>
      index === self.findIndex((el) => el[prop] === obj[prop])
  );
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(props)) {
      if (key === "text") {
        element.textContent = value;
      } else if (key === "html") {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    }

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }

  articles.forEach((article) => {
    const card = createElement(
      "div",
      { class: "card" },
      createElement("h2", { class: "raleway", text: article.title }),
      createElement("img", { src: article.urlToImage, alt: "Article Image" }),
      createElement("p", { class: "raleway", text: article.description })
    );
    card.addEventListener("click", () => openArticleInNewTab(article.url));
    newsContainer.appendChild(card);
  });
}

function openArticleInNewTab(url) {
  window.open(url, "_blank");
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    fetchQuery(query);
  });

fetchNews("Business");

// After importing logoImage (for bundling)
const logoElement = document.querySelector(".logo img"); // Select the <img> element inside .logo
logoElement.src = logoImage; // Set the src attribute to the imported logoImage
