const LS_KEY = "wordleTheme";
let currentTheme = localStorage.getItem(LS_KEY);

function save() {
  localStorage.setItem(LS_KEY, currentTheme);
}

const gameApp = document.querySelector("game-app").shadowRoot;

// watch for the settings modal and add our settings
const contentSlot = gameApp
  .querySelector("game-page")
  .shadowRoot.querySelector('slot[name="content"]');
contentSlot.addEventListener("slotchange", () => {
  const content = contentSlot.assignedElements()[0];
  if (content?.tagName === "GAME-SETTINGS") {
    initSettings(content);
  }
});
document.body.className = currentTheme;
gameApp.querySelector(
  ".title"
).style.fontFamily = `var(--font-${currentTheme.replace("theme-", "")})`;

/** add color settings section to the settings menu */
function initSettings(gameSettings) {
  const firstSection = gameSettings.shadowRoot.querySelector(
    ".sections > section:first-child"
  );

  const darkThemeSetting = firstSection.querySelector(".setting:nth-child(2)");
  darkThemeSetting.remove();

  firstSection.appendChild(colorSetting("Theme", ""));
}

const colors = [
  {
    name: "Light",
    value: "light",
  },
  {
    name: "Dark",
    value: "dark",
  },
  {
    name: "Oceanic",
    value: "oceanic",
  },
  {
    name: "Lavender",
    value: "lavender",
  },
  {
    name: "Ragtag",
    value: "ragtag",
  },
  {
    name: "Natural",
    value: "natural",
  },
  {
    name: "Candy",
    value: "candy",
  },
  {
    name: "Nord",
    value: "nord",
  },
  {
    name: "Lovelace",
    value: "lovelace",
  },
  {
    name: "Beach",
    value: "beach",
  },
  {
    name: "Mesa",
    value: "mesa",
  },
  {
    name: "Shamrock",
    value: "shamrock",
  },
  {
    name: "Tron",
    value: "tron",
  },
];
function colorSetting(title, description) {
  const setting = document.createElement("div");
  setting.classList.add("setting");
  const lower = title.toLowerCase();
  setting.innerHTML = `
    <div class="text">
        <div class="title">${title}</div>
        <div class="description">${description}</div>
    </div>
    <div class="control">
        <select id="${lower}-color-select" style="padding: 6px 2px; background-color: var(--input-bg); outline: none; border: 2px solid var(--color-tone-4); color: var(--color-tone-1); border-radius: 4px;">
            ${colors
              .map(
                (c) =>
                  `<option ${
                    `theme-${c.value}` == currentTheme ? "selected" : ""
                  } value="${
                    c.value
                  }" style="background-color: var(--color-background); color: var(--color-tone-1) outline: none; border: none;">${
                    c.name
                  }</option>`
              )
              .join("")}
        </select>
    </div>
  `;
  const select = setting.querySelector("select");

  select.addEventListener("change", () => {
    onSelectTheme(select.value);
    save();
  });
  return setting;
}

function onSelectTheme(value) {
  //replace anything in the body class with the theme name
  document.body.className = `theme-${value}`;
  currentTheme = `theme-${value}`;
  const title = gameApp.querySelector("header .title");
  title.style.fontFamily = `var(--font-${value})`;
  save();
}
