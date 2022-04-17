// TODO read recipe from JSON file
// TODO automatically inject checked: false
// TODO persist checked state

export default {
  namespaced: true,
  state: {
    name: "Blaubeerwunder",
    pan: {
      diameter: 20.0,
      height: 8.0,
    },
    ingredients: [
      {
        name: "Butter",
        amount: 75,
        unit: "g",
        store: "Kühlregal",
        part: "Butterkeks-Boden",
        scalesWith: "area",
      },
      {
        name: "Kakao-Butterkekse",
        amount: 100,
        unit: "g",
        store: "Süßwaren",
        part: "Butterkeks-Boden",
        scalesWith: "area",
      },
      {
        name: "Heidelbeeren",
        amount: 200,
        unit: "g",
        store: "Früchte",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Puderzucker",
        amount: 200,
        unit: "g",
        store: "Backzutaten",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Magerquark",
        amount: 750,
        unit: "g",
        store: "Kühlregal",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Mascarpone",
        amount: 250,
        unit: "g",
        store: "Kühlregal",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Salz",
        amount: 1,
        unit: "Prise",
        amountInG: 0,
        store: undefined,
        part: "Quark-Mascarpone-Creme",
        scalesWith: undefined,
      },
      {
        name: "Vanille-Zucker",
        amount: 2,
        unit: "Pck.",
        amountInG: 8,
        store: "Backzutaten",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Unbeh. Zitronen",
        amount: 1,
        unit: undefined,
        amountInG: 50,
        store: "Früchte",
        part: "Quark-Mascarpone-Creme",
        hint: "Abrieb u. Saft",
        scalesWith: "volume",
      },
      {
        name: "Himbeeren",
        amount: 100,
        unit: "g",
        store: "Früchte",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Gelatine",
        amount: 9,
        unit: "Blatt",
        amountInG: 0,
        store: "Backzutaten",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Sahne",
        amount: 150,
        unit: "ml",
        amountInG: 152,
        store: "Kühlregal",
        part: "Quark-Mascarpone-Creme",
        scalesWith: "volume",
      },
      {
        name: "Zartbitter-Kuvertüre",
        amount: 50,
        unit: "g",
        store: "Backzutaten",
        part: "Glasur, Belag und Garnitur",
        scalesWith: "area",
      },
      {
        name: "Sahne",
        amount: 50,
        unit: "ml",
        amountInG: 51,
        store: "Kühlregal",
        part: "Glasur, Belag und Garnitur",
        scalesWith: "area",
      },
      {
        name: "Heidelbeeren",
        amount: 275,
        unit: "g",
        store: "Früchte",
        part: "Glasur, Belag und Garnitur",
        scalesWith: "area",
      },
      {
        name: "Jasmin- oder Phloxblüten",
        amount: 10,
        unit: undefined,
        amountInG: 0,
        store: "Backzutaten",
        part: "Glasur, Belag und Garnitur",
        scalesWith: "area",
      },
    ],
    steps: [
      {
        part: "Butterkeks-Boden",
        instructions: [
          {
            text: "Boden der Form mit Backpapier auslegen.",
            checked: false,
          },
          {
            text: "Butter schmelzen.",
            checked: false,
            ingredients: [
              {
                name: "Butter",
                checked: false,
              },
            ],
          },
          {
            text: "Kekse fein zerbröseln und mit der Butter mischen.",
            checked: false,
            ingredients: [
              {
                name: "Kakao-Butterkekse",
                checked: false,
              },
            ],
          },
          {
            text: "Keksmasse in der Form verteilen und andrücken.",
            checked: false,
          },
        ],
      },
      {
        part: "Quark-Mascarpone-Creme",
        instructions: [
          {
            text: "Heidelbeeren mit 1/4 des Puderzuckers pürieren.",
            checked: false,
            ingredients: [
              {
                name: "Heidelbeeren",
                checked: false,
                addsTo: "Heidelbeerpüree",
              },
              {
                name: "Puderzucker",
                relativeAmount: 1 / 4,
                checked: false,
                addsTo: "Heidelbeerpüree",
              },
            ],
          },
          {
            text: "Quark, Mascarpone, restlichen Puderzucker, Salz, Vanille-Zucker, Abrieb und Saft der Zitrone gut verrühren.",
            checked: false,
            ingredients: [
              {
                name: "Magerquark",
                checked: false,
                addsTo: "Quark-Masse",
              },
              {
                name: "Mascarpone",
                checked: false,
                addsTo: "Quark-Masse",
              },
              {
                name: "Puderzucker",
                relativeAmount: 3 / 4,
                checked: false,
                addsTo: "Quark-Masse",
              },
              {
                name: "Salz",
                checked: false,
                addsTo: "Quark-Masse",
              },
              {
                name: "Vanille-Zucker",
                checked: false,
                addsTo: "Quark-Masse",
              },
              {
                name: "Unbeh. Zitronen",
                checked: false,
                addsTo: "Quark-Masse",
              },
            ],
          },
          {
            text: "Von der Quark-Masse etwas weniger als die Hälfte für die obere Schicht abnehmen, kalt stellen.",
            checked: false,
            ingredients: [
              {
                name: "Quark-Masse",
                relativeAmount: 0.45,
                checked: false,
                addsTo: "Masse für die obere Schicht",
              },
            ],
          },
          {
            text: "Restliche Quark-Masse auf 2 Schüsseln aufteilen, dabei für die mittlere Schicht etwas mehr abfüllen.",
            checked: false,
            ingredients: [
              {
                name: "Quark-Masse",
                relativeAmount: 0.3,
                checked: false,
                addsTo: "Masse für die mittlere Schicht",
              },
              {
                name: "Quark-Masse",
                relativeAmount: 0.25,
                checked: false,
                addsTo: "Masse für die untere Schicht",
              },
            ],
          },
          {
            text: "Masse für die mittlere Schicht mit etwas mehr als der Hälfte des Heidelbeerpürees verrühren, kaltstellen.",
            checked: false,
            ingredients: [
              {
                name: "Masse für die mittlere Schicht",
                checked: false,
                addsTo: "Mittlere Schicht",
              },
              {
                name: "Heidelbeerpüree",
                relativeAmount: 0.55,
                checked: false,
                addsTo: "Mittlere Schicht",
              },
            ],
          },
          {
            text: "Für die untere Schicht restliches Heidelbeerpüree mit Himbeeren pürieren, mit der Quark-Masse für die untere Schicht verrühren.",
            checked: false,
            ingredients: [
              {
                name: "Heidelbeerpüree",
                relativeAmount: 0.45,
                checked: false,
                addsTo: "Untere Schicht",
              },
              {
                name: "Himbeeren",
                checked: false,
                addsTo: "Untere Schicht",
              },
              {
                name: "Masse für die untere Schicht",
                checked: false,
                addsTo: "Untere Schicht",
              },
            ],
          },
          {
            text: "1/3 der Gelatine nach Packungsanleitung einweichen.",
            checked: false,
            ingredients: [
              {
                name: "Gelatine",
                relativeAmount: 1 / 3,
                checked: false,
              },
            ],
          },
          {
            text: "Sahne steif schlagen und kühlstellen.",
            checked: false,
            ingredients: [
              {
                name: "Sahne",
                checked: false,
                addsTo: "Steife Sahne",
              },
            ],
          },
          {
            text: "Gelatine auflösen, Temperaturausgleich durchführen und in die Quark-Masse einrühren.",
            checked: false,
          },
          {
            text: "Ca. 2-5 Minuten kühlstellen und 1/4 der Sahne unterheben.",
            checked: false,
            icon: "img/bell.svg",
            ingredients: [
              {
                name: "Steife Sahne",
                checked: false,
                relativeAmount: 1 / 4,
              },
            ],
          },
          {
            text: "Creme auf den Boden geben und glattstreichen.",
            checked: false,
          },
          {
            text: "Torte mind. 30 Minuten kaltstellen.",
            checked: false,
            icon: "img/bell.svg",
          },
          {
            text: "Für die mittlere Schicht wieder 1/3 der Gelatine einweichen.",
            checked: false,
            ingredients: [
              {
                name: "Gelatine",
                relativeAmount: 1 / 3,
                checked: false,
              },
            ],
          },
          {
            text: "Heidelbeer-Quark-Creme zubereiten (s.o.)", // TODO expandieren
            checked: false,
          },
          {
            text: "Heidelbeer-Quark-Creme auf die untere Schicht geben und glattstreichen.",
            checked: false,
          },
          {
            text: "Torte wieder 30 Minuten kalt stellen.",
            checked: false,
            icon: "img/bell.svg",
          },
          {
            text: "Für die obere Schicht restliche Gelatine einweichen.",
            checked: false,
            ingredients: [
              {
                name: "Gelatine",
                relativeAmount: 1 / 3,
                checked: false,
              },
            ],
          },
          {
            text: "Weiße Quark-Creme zubereiten (s.o.), dabei die restliche Sahne unterheben.", // TODO expandieren
            checked: false,
            ingredients: [
              {
                name: "Steife Sahne",
                checked: false,
                relativeAmount: 3 / 4,
              },
            ],
          },
          {
            text: "Creme einfüllen und glattstreichen.",
            checked: false,
          },
          {
            text: "Torte mind. 4 Stunden kalt stellen.",
            checked: false,
            icon: "img/bell.svg",
          },
          {
            text: "Springform entfernen.",
            checked: false,
          },
        ],
      },
      {
        part: "Glasur, Belag und Garnitur",
        instructions: [
          {
            text: "Kuvertüre hacken.",
            checked: false,
            ingredients: [
              {
                name: "Zartbitter-Kuvertüre",
                checked: false,
              },
            ],
          },
          {
            text: "Sahne kurz aufkochen, vom Herd nehmen.",
            checked: false,
            ingredients: [
              {
                name: "Sahne",
                checked: false,
              },
            ],
          },
          {
            text: "Kuvertüre unter Rühren in der Sahne schmelzen.",
            checked: false,
          },
          {
            text: "Schoko-Glasur zügig aufstreichen.",
            checked: false,
          },
          {
            text: "Mit Heidelbeeren und Blüten belegen.",
            checked: false,
            ingredients: [
              {
                name: "Heidelbeeren",
                checked: false,
              },
              {
                name: "Jasmin- oder Phloxblüten",
                checked: false,
              },
            ],
          },
          {
            text: "Mind. 30 Minuten kaltstellen.",
            checked: false,
            icon: "img/bell.svg",
          },
        ],
      },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
};
