const apikey = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=Technology&apiKey=${apikey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const slides = data.articles;
      const filtered = slides.filter(
        (article) => article.title !== "[Removed]" && article.urlToImage
      );
      const slideshowContainer = document.querySelector(".slideshow-container");
      const dotsContainer = document.querySelector(
        '.introduction > div[style="text-align: center"]'
      );

      dotsContainer.innerHTML = "";

      // Create slides and dots
      filtered.forEach((slide, index) => {
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("mySlides", "fade");
        slideDiv.innerHTML = `
          <div class="numbertext">${index + 1} / ${filtered.length}</div>
          <img src="${
            slide.urlToImage
          }" style="max-width:700px; height:400px; object-fit:cover; " >
          <div class="text" style="background-color: rgba(73, 72, 72, 0.7);  height: 5px; max-width: 700px; padding-bottom:30px;">${
            slide.title
          }</div>
        `;
        slideshowContainer.appendChild(slideDiv);

        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.setAttribute("onclick", `currentSlide(${index + 1})`);
        dotsContainer.appendChild(dot);
      });

      // Initialize slideshow
      let slideIndex = 1;
      showSlides(slideIndex);

      function plusSlides(n) {
        showSlides((slideIndex += n));
      }

      function currentSlide(n) {
        showSlides((slideIndex = n));
      }

      function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
          slideIndex = 1;
        }
        if (n < 1) {
          slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
      }

      document.querySelector(".prev").addEventListener("click", function () {
        plusSlides(-1);
      });

      document.querySelector(".next").addEventListener("click", function () {
        plusSlides(1);
      });
    })
    .catch((error) => console.error("Error fetching the news:", error));
});
