import { CARDS_DEFAULT } from "./data/card_content.js";
import { MENU_CONTENT } from "./data/header_content.js";

function renderCards(cardsForProjects) {
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = "";

  cardsForProjects.forEach((card, index) => {
    if (index % 2 === 0) {
      const cardRow = document.createElement("div");
      cardRow.className = "card_row";
      cardContainer.appendChild(cardRow);
    }
    const previousRow = cardContainer.lastChild;
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
      <div class="img_container_card">
        <img src="${card.imgSrc}" class="card_image" />
      </div>
      <div class="text_container_card">
        <h2 class="header_card">${card.title}</h2>
        <p class="text_card">${card.description}</p>
      </div>
    `;
    previousRow.appendChild(cardDiv);
  });
}

function renderNavBar(elementName) {
  const dropdownContainer = document.getElementById(elementName);
  MENU_CONTENT.forEach((mainMenu) => {
    const menuItem = document.createElement("li");
    menuItem.className = "main_item";
    let subMenuHtml = `<p class="menu_txt">${mainMenu.main}</p><ul class="submenu">`;

    mainMenu.subs.forEach((sub) => {
      if (sub === "View all projects") {
        subMenuHtml += `
          <li class="view_all_sub">
            <p class="sub_txt"><span class="link_span">View all projects</span></p>
          </li>`;
      } else if (sub === "DEVELOPMENT TOOLS") {
        subMenuHtml += `
          <li>
            <p id="DEVELOPMENT_tools">DEVELOPMENT TOOLS</p>
          </li>`;
      } else if (sub === "Spring Initializr") {
        subMenuHtml += `
          <li><span class="text_and_svg">
            <p class="sub_txt" id="special_p">Spring Initializr</p><svg aria-hidden="true"
              focusable="false" data-prefix="fas" data-icon="arrow-up-right-from-square"
              class="inline_svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path class="path_for_inline_svg" fill="currentColor"
                d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z">
              </path>
            </svg>
          </span></li>`;
      } else {
        subMenuHtml += `
          <li>
            <p class="sub_txt">${sub}</p>
          </li>`;
      }
    });

    subMenuHtml += "</ul>";
    menuItem.innerHTML = subMenuHtml;
    dropdownContainer.appendChild(menuItem);
    document.getElementById("sidebar_menu").style.display = "none";
  });
}

let isBurgerOpen = false;

window.toggleBurgerMenu = function () {
  const sidebarMenu = document.getElementById("sidebar_menu");
  const hamburger = document.getElementById("hamburger");
  isBurgerOpen = !isBurgerOpen;
  sidebarMenu.style.display = isBurgerOpen ? "flex" : "none";
  hamburger.style.position = isBurgerOpen ? "fixed" : "static";
  if (isBurgerOpen) hamburger.style.right = "0";
};

function renderNavSide(elementName) {
  const dropdownContainer = document.getElementById(elementName);
  MENU_CONTENT.forEach((mainMenu) => {
    const menuItem = document.createElement("li");
    menuItem.className = "main_item_side";
    let subMenuHtml = `<p class="menu_txt_side">${mainMenu.main}</p><ul class="submenu_side">`;

    mainMenu.subs.forEach((sub) => {
      if (sub === "DEVELOPMENT TOOLS") {
        subMenuHtml += `
          <li>
            <p id="DEVELOPMENT_tools">DEVELOPMENT TOOLS</p>
          </li>`;
      } else {
        subMenuHtml += `
          <li>
            <p class="sub_txt_side">${sub}</p>
          </li>`;
      }
    });

    subMenuHtml += "</ul>";
    menuItem.innerHTML = subMenuHtml;
    dropdownContainer.appendChild(menuItem);
    const menuTxtSide = menuItem.querySelector(".menu_txt_side");
    const submenuSide = menuItem.querySelector(".submenu_side");
    menuTxtSide.addEventListener("click", () => {
      if (submenuSide.style.display === "block") {
        submenuSide.style.display = "none";
        menuTxtSide.classList.remove("rotate-180");
      } else {
        submenuSide.style.display = "block";
        menuTxtSide.classList.add("rotate-180");
      }
    });
  });
}

let searchTimeout;

function searchFor(query) {
  query = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  if (query.length < 2) {
    renderCards(CARDS_DEFAULT);
    return;
  }
  const resultingDataSet = CARDS_DEFAULT.filter((element) => {
    return (
      element.title.toLowerCase().includes(query) ||
      element.description.toLowerCase().includes(query)
    );
  });

  resultingDataSet.length < 1
    ? (document.getElementById("card_container").innerHTML =
        "<h1>Invalid input, no data found!</h1>")
    : renderCards(resultingDataSet);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards(CARDS_DEFAULT);
  renderNavBar("dropdown_menu");
  renderNavSide("sidebar_menu");
  const search = document.getElementById("search_bar");
  search.addEventListener("input", (event) => {
    clearTimeout(searchTimeout);
    const searchTarget = event.target.value;
    searchTimeout = setTimeout(() => searchFor(searchTarget), 300);
  });
});
