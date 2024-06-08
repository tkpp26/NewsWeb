const apiKey = "bc0c5c54ba5f46279fceac6301227d04";
const url = `https://newsapi.org/v2/everything?q=openai&from=2024-06-07&sortBy=publishedAt&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    displayNews(data.articles); // Call a function to display news articles
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  // Clear previous content
  newsContainer.innerHTML = "";

  // Function to create HTML elements in JSX-like format
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

  // Iterate through each article and create HTML elements to display them
  articles.forEach((article) => {
    const articleElement = createElement(
      "div",
      { class: "article" },
      createElement("h3", { text: article.title }),
      createElement("p", { text: article.description }),
      createElement("span", { text: `Source: ${article.source.name}` }),
      createElement("span", { text: `Published At: ${article.publishedAt}` }),
      createElement("a", {
        text: "Read more",
        href: article.url,
        target: "_blank",
      })
    );

    newsContainer.appendChild(articleElement);
  });
}

const po = document.getElementById("po");
const but = document.getElementById("but");

but.addEventListener("click", () => {
  po.innerHTML = "<div id='news-container'></div>";
  fetchNews(); // Call the fetchNews function when button is clicked
});
