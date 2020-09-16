const supertest = require("supertest")
const server = require("../api/server")



describe("get to jokes without auth", () => {
	it("Should fail", async () => {
		const res = await supertest(server).get("/api/jokes")
		expect(res.statusCode).toBe(401)

    })
    
	it("Should fail with message", async () => {
		const res = await supertest(server).get("/api/jokes")
		
		expect(res.body).toEqual({"message": "Invalid credentials"})
	
	})


})