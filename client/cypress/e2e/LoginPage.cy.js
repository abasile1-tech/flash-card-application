describe("Login Page", () => {
  it("the h1 contains the correct text", () => {
    cy.visit("http://localhost:8080/#/");
    // add the data-testid attribute to elements and then search for them with the cy.getByData custom command
    cy.getByData("login-h1").contains("Welcome to the Flash Card App!");
  });
});
