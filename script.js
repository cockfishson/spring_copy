import { CARDS_DEFAULT } from "./card_content.js";
import { MENU_CONTENT } from "./header_content.js";
function Render_cards(cards_for_projects) {
  const card_container = document.getElementById("card_container");
  card_container.innerHTML = "";

  cards_for_projects.map((card, index) => {
    if (index % 2 === 0) {
      const card_row = document.createElement("div");
      card_row.className = "card_row";
      card_container.appendChild(card_row);
    }
    const previous_row = card_container.lastChild;
    const card_div = document.createElement("div");
    card_div.className = "card";
    card_div.innerHTML = `
      <div class="img_container_card">
        <img src="${card.imgSrc}" class="card_image" />
      </div>
      <div class="text_container_card">
        <h2 class="header_card">${card.title}</h2>
        <p class="text_card">${card.description}</p>
      </div>
    `;
    previous_row.appendChild(card_div);
  });
}

function Render_nav_bar(element_name) {
  const dropdown_container = document.getElementById(element_name);
  MENU_CONTENT.map((mainmenu) => {
    const menu_item = document.createElement("li");
    menu_item.className = "main_item";
    let submenu_html = `<p class="menu_txt">${mainmenu.main}</p><ul class="submenu">`;

    mainmenu.subs.map((sub) => {
      if (sub === "View all projects") {
        submenu_html += `
          <li class="view_all_sub">
            <p class="sub_txt"><span class="link_span">View all projects</span></p>
          </li>`;
      } else if (sub === "DEVELOPMENT TOOLS") {
        submenu_html += `
          <li>
            <p id="DEVELOPMENT_tools">DEVELOPMENT TOOLS</p>
          </li>`;
      } else if (sub === "Spring Initializr") {
        submenu_html += `
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
        submenu_html += `
          <li>
            <p class="sub_txt">${sub}</p>
          </li>`;
      }
    });

    submenu_html += "</ul>";
    menu_item.innerHTML = submenu_html;
    dropdown_container.appendChild(menu_item);
    document.getElementById("sidebar_menu").style.display = "none";
  });
}

let isBurgerOpen = false;

window.toggleBurgerMenu = function () {
  const sidebar_menu = document.getElementById("sidebar_menu");
  const hamburger = document.getElementById("hamburger");

  if (isBurgerOpen) {
    sidebar_menu.style.display = "none";
    hamburger.style.position = "static";
    isBurgerOpen = false;
  } else {
    sidebar_menu.style.display = "flex";
    hamburger.style.position = "fixed";
    hamburger.style.right = "0";
    isBurgerOpen = true;
  }
};

function Render_nav_side(element_name) {
  const dropdown_container = document.getElementById(element_name);
  MENU_CONTENT.map((mainmenu) => {
    const menu_item = document.createElement("li");
    menu_item.className = "main_item_side";
    let submenu_html = `<p class="menu_txt_side">${mainmenu.main}</p><ul class="submenu_side">`;

    mainmenu.subs.map((sub) => {
      if (sub === "DEVELOPMENT TOOLS") {
        submenu_html += `
          <li>
            <p id="DEVELOPMENT_tools">DEVELOPMENT TOOLS</p>
          </li>`;
      } else {
        submenu_html += `
          <li>
            <p class="sub_txt_side">${sub}</p>
          </li>`;
      }
    });

    submenu_html += "</ul>";
    menu_item.innerHTML = submenu_html;
    dropdown_container.appendChild(menu_item);
    const menu_txt_side = menu_item.querySelector(".menu_txt_side");
    const submenu_side = menu_item.querySelector(".submenu_side");
    menu_txt_side.addEventListener("click", () => {
      if (submenu_side.style.display === "block") {
        submenu_side.style.display = "none";
        menu_txt_side.classList.remove("rotate-180");
      } else {
        submenu_side.style.display = "block";
        menu_txt_side.classList.add("rotate-180");
      }
    });
  });
}

let searchTimeout;

function Search_for(query) {
  query = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  if (query.length < 2) {
    Render_cards(CARDS_DEFAULT);
    return;
  }
  const resulting_data_set = CARDS_DEFAULT.filter((element) => {
    return (
      element.title.toLowerCase().includes(query) ||
      element.description.toLowerCase().includes(query)
    );
  });

  resulting_data_set.length < 1
    ? (document.getElementById("card_container").innerHTML =
        "<h1>Invalid input, no data found!</h1>")
    : Render_cards(resulting_data_set);
}

document.addEventListener("DOMContentLoaded", () => {
  Render_cards(CARDS_DEFAULT);
  Render_nav_bar("dropdown_menu");
  Render_nav_side("sidebar_menu");
  const search = document.getElementById("search_bar");
  search.addEventListener("input", (event) => {
    clearTimeout(searchTimeout);
    const search_target = event.target.value;
    searchTimeout = setTimeout(() => Search_for(search_target), 300);
  });
});
