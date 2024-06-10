const apiKey = "bc0c5c54ba5f46279fceac6301227d04";
const url = `https://newsapi.org/v2/everything?q=japan&from=2024-06-07&sortBy=publishedAt&apiKey=${apiKey}`;

async function fetchNews(query) {
  const formattedQuery = query.replace(/\s+/g, "_"); // Replace spaces with underscores
  const url = `https://newsapi.org/v2/everything?q=${formattedQuery}&from=2024-06-07&sortBy=publishedAt&apiKey=${apiKey}`;

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
    ); // Call a function to display news articles
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

/*

async function fetchNews() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    displayNews(
      data.articles.filter(
        (article) => article.title !== "[Removed]" && article.urlToImage
      )
    ); // Call a function to display news articles
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
*/

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  // Clear previous content
  newsContainer.innerHTML = "";

  // Function to create HTML elements
  function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    // Set properties
    for (const [key, value] of Object.entries(props)) {
      if (key === "text") {
        element.textContent = value;
      } else if (key === "html") {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    }

    // Append children
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }

  // Create and append article cards
  articles.forEach((article) => {
    const card = createElement(
      "div",
      { class: "card", onclick: `openArticleInNewTab('${article.url}')` },
      createElement("h2", { class: "raleway", text: article.title }),
      createElement("img", { src: article.urlToImage, alt: "Article Image" }),
      createElement("p", { class: "raleway", text: article.description })
    );
    newsContainer.appendChild(card);
  });
}

// Function to open article in new tab
function openArticleInNewTab(url) {
  window.open(url, "_blank"); // Open URL in a new tab
}

// Event listener for the search form
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    fetchNews(query);
  });

fetchNews("OpenAI");
