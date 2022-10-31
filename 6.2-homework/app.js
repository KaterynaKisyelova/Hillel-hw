const CATEGORY = "category";
const PRODUCT = "product";
const menu = [
  {
    type: CATEGORY,
    name: "Mac",
    menu: [
      {
        type: PRODUCT,
        name: "MacBook Pro 16”",
      },
      {
        type: PRODUCT,
        name: "iMac 24”",
      },
      {
        type: PRODUCT,
        name: "iMac 27”",
      },
      {
        type: CATEGORY,
        name: "Accessories",
        menu: [
          {
            type: CATEGORY,
            name: "Featured Magic",
            menu: [
              {
                type: PRODUCT,
                name: "Magic Keyboard",
              },
              {
                type: PRODUCT,
                name: "Magic Trackpad",
              },
            ],
          },
          {
            type: CATEGORY,
            name: "Audio",
            menu: [
              {
                type: PRODUCT,
                name: "AirPods Pro",
              },
              {
                type: PRODUCT,
                name: "AirPods Max",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: CATEGORY,
    name: "Ipad",
    menu: [
      {
        type: PRODUCT,
        name: "iPad Pro 11”",
      },
      {
        type: PRODUCT,
        name: "iPad Pro 12.9”",
      },
      {
        type: CATEGORY,
        name: "Accessories",
        menu: [
          {
            type: PRODUCT,
            name: "Apple Pencil",
          },
          {
            type: PRODUCT,
            name: "Smart Keyboard",
          },
        ],
      },
    ],
  },
  {
    type: CATEGORY,
    name: "Empty Category",
    menu: [],
  },
];

let res = "";
const menuStr = printMenu(menu);
console.log(menuStr);

function printMenu(menu, level = 0) {
  menu.forEach((item) => {
    res += `${addLevel(level)} ${chooseType(item.type)} ${item.name}\n`;
    if (!item.menu) {
      return;
    }
    printMenu(item.menu, chooseLevel(item.type, level));
  });
  return res;
}

function chooseType(type) {
  return type === CATEGORY ? "*" : "-";
}

function chooseLevel(type, level) {
  return type === CATEGORY ? level + 1 : level;
}

function addLevel(amount) {
  let spaces = "";
  for (let i = 0; i < amount; i++) {
    spaces += " ";
  }
  return spaces;
}
