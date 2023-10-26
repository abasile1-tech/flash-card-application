describe("Single Deck Page", () => {
  it("a user can log in and see a single deck", () => {
    cy.visit("http://localhost:5000/#/");
    // add the data-testid attribute to elements and then search for them with the cy.getByData custom command
    cy.getByData("login-username").type("Grandma");
    cy.getByData("login-password").type("1234");
    cy.getByData("login-button").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/#/welcome/");
    });
    cy.getByData("notebook-button").first().click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        "http://localhost:5000/#/welcome/single-deck/Grandma's%20First%20Deck"
      );
    });
  });
});
