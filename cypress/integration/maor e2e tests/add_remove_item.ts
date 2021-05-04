const buyMilk = "buy milk";

context("Whatever", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it(`Add '${buyMilk}'`, () => {
    cy.get("[data-testid=item-input]")
      .type(buyMilk)
      .should("have.value", buyMilk);

    cy.get("[data-testid=button-submit]").click();

    cy.contains(buyMilk).should("exist");
  });

  it(`Remove '${buyMilk}'`, () => {
    cy.get("[data-testid=item-input]").type(buyMilk);

    cy.get("[data-testid=button-submit]").click();

    cy.get("[data-testid=item-1]").click();

    cy.contains(buyMilk).should("not.exist");
  });

  ["buy drinks", "buy sandwich"].forEach((testItem) => {
    it(`Add '${testItem}'`, () => {
      cy.get("[data-testid=item-input]")
        .type(testItem)
        .should("have.value", testItem);

      cy.get("[data-testid=button-submit]").click();

      cy.contains(testItem).should("exist");
    });

    it(`Remove '${testItem}'`, () => {
      cy.get("[data-testid=item-input]").type(testItem);

      cy.get("[data-testid=button-submit]").click();

      cy.get("[data-testid=item-1]").click();

      cy.contains(testItem).should("not.exist");
    });
  });

  it(`Add many`, () => {
    ["buy drinks", "buy milk", "buy sandwich"].forEach((testItem, index) => {
      cy.get("[data-testid=item-input]").type(testItem);

      cy.get("[data-testid=button-submit]").click();

      cy.contains(testItem).should("exist");

      cy.get("[data-testid=item-input]").clear();
    });
  });

  it.only(`Remove many`, () => {
    ["buy drinks", "buy milk", "buy sandwich"].forEach((testItem) => {
      cy.get("[data-testid=item-input]").type(testItem);

      cy.get("[data-testid=button-submit]").click();

      cy.contains(testItem).should("exist");

      cy.get("[data-testid=item-input]").clear();
    });

    ["buy drinks", "buy milk", "buy sandwich"].forEach((testItem, index) => {
      cy.get(`[data-testid=item-${index + 1}]`).click();

      cy.contains(testItem).should("not.exist");
    });
  });
});
