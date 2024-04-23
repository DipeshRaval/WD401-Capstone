describe("Online Voting System tests", () => {
    const url = "http://localhost:3000";
    let authToken;
    before(() => {
        cy.request("POST", `${url}/user/signup`, {
            firstName: "Dipu",
            lastName: "rvl",
            email: "drvl@gmail.com",
            password: "dipu",
        }).then((response) => {
            authToken = response.body.token;
        });
    });

    beforeEach(() => {
        cy.request("POST", `${url}/user/signin`, {
            email: "drvl@gmail.com",
            password: "dipu",
        }).then((response) => {
            authToken = response.body.token;
        });
    });

    it("Signup new user", () => {
        cy.request("POST", `${url}/user/signup`, {
            firstName: "Dipu",
            lastName: "rvl",
            email: "sss@gmail.com",
            password: "dipu",
        })
            .then((response) => {
                authToken = response.body.token;
            })
            .its("status")
            .should("eq", 200);
    });

    it("User login", () => {
        cy.request("POST", `${url}/user/signin`, {
            email: "sss@gmail.com",
            password: "dipu",
        })
            .then((response) => {
                authToken = response.body.token;
            })
            .its("status")
            .should("eq", 200);
    });

    it("Fetch Elections", () => {
        cy.request({
            method: "GET",
            url: `${url}/election`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .its("status")
            .should("eq", 200);
    });

    it("Create a new Election", () => {
        cy.request({
            method: "POST",
            url: `${url}/election`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: {
                title: "Class Monitor 2023",
                url: "monitor",
            },
        })
            .its("status")
            .should("eq", 200);
    });
});