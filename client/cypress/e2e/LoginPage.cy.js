describe("Login Page", () => {
  it("the h1 contains the correct text", () => {
    cy.visit("http://localhost:8080/#/");
    cy.getByData("login-h1").contains("Welcome to the Flash Card App!");
  });
});
