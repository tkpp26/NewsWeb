import "./styles/about.css";
import logoImage from "./images/logo.jpg";

// After importing logoImage
const logoElement = document.querySelector(".logo img"); // Select the <img> element inside .logo
logoElement.src = logoImage; // Set the src attribute to the imported logoImage
