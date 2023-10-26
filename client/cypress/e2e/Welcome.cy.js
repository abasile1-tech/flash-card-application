describe("Welcome Page", () => {
  it("a user can log in", () => {
    cy.visit("http://localhost:5000/#/");
    // add the data-testid attribute to elements and then search for them with the cy.getByData custom command
    cy.getByData("login-username").type("Grandma");
    cy.getByData("login-password").type("1234");
    cy.getByData("login-button").click();
    cy.wait(1000);
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/#/welcome/");
    });
  });
});
