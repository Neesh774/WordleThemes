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
        <select id="${lower}-color-select" style="padding: 4px 0;">
            ${colors
              .map(
                (c) =>
                  `<option ${
                    `theme-${c.value}` == currentTheme ? "selected" : ""
                  } value="${c.value}">${c.name}</option>`
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
  console.log("selected");
  //replace anything in the body class with the theme name
  document.body.className = `theme-${value}`;
  currentTheme = `theme-${value}`;
  save();
}
