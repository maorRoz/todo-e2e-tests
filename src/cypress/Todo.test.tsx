import { mount } from "@cypress/react";
import { Todo } from "../Todo";

it("renders learn react link", () => {
  mount(<Todo />);
  cy.get("[data-testid=item-input]").type("blabla");
});
