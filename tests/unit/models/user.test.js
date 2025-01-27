const config = require("config");
const {User} = require("../../../sunday/vidly/models/user")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("user.generateAuthToken", () => {
    // mock function to check generateAuthToken()
    it("should return a valid JWT", () => {
        // changed the ID to hexa string because generateAuthToken() converts the ID to hexa string
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, "heelo");
        expect(decoded).toMatchObject(payload);
    });
});