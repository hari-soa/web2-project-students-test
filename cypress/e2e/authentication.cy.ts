describe("Teacher Authentication and Registration Flow", () => {
  const teacher = {
    firstName: "Jean",
    lastName: "Dupont",
    email: `teacher_${Date.now()}@school.com`,
    password: "Password123!",
  };

  it("should register a new teacher successfully using UI clicks", () => {
    cy.visit("http://localhost:5173");

    // Switch to Register Mode
    cy.get("[data-cy=switch-to-register]").click();

    // Fill form
    cy.get("[data-cy=input-first-name]").type(teacher.firstName);
    cy.get("[data-cy=input-last-name]").type(teacher.lastName);
    cy.get("[data-cy=input-email]").type(teacher.email);
    cy.get("[data-cy=input-password]").type(teacher.password);

    // Submit registration
    cy.get("[data-cy=btn-submit-register]").click();

    // Verification
    cy.contains("Account created successfully").should("be.visible");
  });

  it("should authenticate teacher and load age statistics chart", () => {
    cy.visit("http://localhost:5173");

    // Login flow
    cy.get("[data-cy=input-email]").type(teacher.email);
    cy.get("[data-cy=input-password]").type(teacher.password);
    cy.get("[data-cy=btn-submit-login]").click();

    // Verify dashboard elements
    cy.contains("Teacher Dashboard").should("be.visible");
    cy.contains("Age Distribution Statistics").should("be.visible");
    cy.get("canvas").should("be.visible");
  });
});
