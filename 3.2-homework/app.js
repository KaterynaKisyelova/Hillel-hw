const obj = {
  prop: "42",
  prop2: [
    8,
    9,
    10,
    {
      beautifulPropertyName: 88,
      "property with spaces": {
        a: {
          b: "",
          c: {
            someProperty: [
              {
                "prop name": "I am a smart programmer",
              },
            ],
          },
        },
      },
    },
  ],
  prop3: function () {
    return {
      baz: "Hello",
      bar: {
        anotherBeautifulProp: [
          8,
          {
            target: "It was simple!",
            qwe: [8, 17, 37],
          },
        ],
      },
    };
  },
};

console.log(
  obj.prop2[3]["property with spaces"].a.c.someProperty[0]["prop name"]
);
console.log(obj.prop3().bar.anotherBeautifulProp[1].target);
