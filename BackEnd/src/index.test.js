const app = require("./index");
describe("GET /words", () => {
  test("should return an array of 10 words with the required criteria", async () => {
    const response = await fetch("http://localhost:3000/words");
    expect(response.status).toBe(200);

    const selectedWords = await response.json();

    const criteria = {
      adjective: false,
      adverb: false,
      noun: false,
      verb: false,
    };

    selectedWords.forEach((word) => {
      if (word.pos === "adjective") criteria.adjective = true;
      if (word.pos === "adverb") criteria.adverb = true;
      if (word.pos === "noun") criteria.noun = true;
      if (word.pos === "verb") criteria.verb = true;
    });

    expect(criteria.adjective).toBe(true);
    expect(criteria.adverb).toBe(true);
    expect(criteria.noun).toBe(true);
    expect(criteria.verb).toBe(true);
  });
});
