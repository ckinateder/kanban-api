require('dotenv').config();

const address = process.env.TEST_API_URL;
const request = require("supertest")(address);
const expect = require("chai").expect;
const chalk = require("chalk");

describe("GET /api/tasks", function () {
  it("returns all tasks in the database", async function () {
    const endpoint = "/api/tasks"
    const response = await request.get(endpoint);
    expect(response.status).to.eql(200);
  });
});

describe("POST /api/tasks and add to do", function () {
    it("adds a new task (to do)", async function () {
      const response = await request
        .post("/api/tasks")
        .send({ title: "test to do", type:"to do", description: "yay" });
  
      expect(response.status).to.eql(200);

      const attributes = response.body;
      expect(response.body).to.include.keys("title", "type", "priority","description", "user", "createdAt", "updatedAt", "id");
      expect(attributes.title).to.eql("test to do");
      expect(attributes.type).to.eql("to do");
      expect(attributes.priority).to.eql("low");
      expect(attributes.user).to.eql("root");
      expect(attributes.points).to.eql(1);
      /**
      // delete what we just made 
      const deleted = await request
      .del(`/api/tasks/${attributes.id}`)
      .send(attributes.id); */
    });
});

describe("POST /api/tasks and add in progress", function () {
    it("adds a new task (in progress)", async function () {
      const response = await request
        .post("/api/tasks")
        .send({ title: "test in progress", type:"in progress", description: "yay" });
  
      expect(response.status).to.eql(200);

      const attributes = response.body;
      expect(response.body).to.include.keys("title", "type", "priority","description", "user", "createdAt", "updatedAt", "id");
      expect(attributes.title).to.eql("test in progress");
      expect(attributes.type).to.eql("in progress");
      expect(attributes.priority).to.eql("low");
      expect(attributes.user).to.eql("root");
      expect(attributes.points).to.eql(1);
      /**
      // delete what we just made 
      const deleted = await request
      .del(`/api/tasks/${attributes.id}`)
      .send(attributes.id); */
    });
});


describe("POST /api/tasks and add done", function () {
  it("adds a new task (done)", async function () {
    const response = await request
      .post("/api/tasks")
      .send({ title: "test done", type:"done", description: "yayyy" });

    expect(response.status).to.eql(200);

    const attributes = response.body;
    expect(response.body).to.include.keys("title", "type", "priority","description", "user", "createdAt", "updatedAt", "id");
    expect(attributes.title).to.eql("test done");
    expect(attributes.type).to.eql("done");
    expect(attributes.priority).to.eql("low");
    expect(attributes.user).to.eql("root");
    expect(attributes.points).to.eql(1);
    /**
    // delete what we just made 
    const deleted = await request
    .del(`/api/tasks/${attributes.id}`)
    .send(attributes.id); */
  });
});

describe("GET ALL TO DO /api/tasks", function () {
  it("returns all to do tasks in the database", async function () {
    const endpoint = "/api/tasks/todo"
    const response = await request.get(endpoint);
    expect(response.status).to.eql(200);
    response.body.forEach(element => {      
      expect(element.type).to.eql("to do");
    });
  });
});

describe("GET ALL IN PROGRESS /api/tasks", function () {
  it("returns all in progress tasks in the database", async function () {
    const endpoint = "/api/tasks/inprogress"
    const response = await request.get(endpoint);
    expect(response.status).to.eql(200);
    response.body.forEach(element => {      
      expect(element.type).to.eql("in progress");
    });  
  });
});

describe("GET ALL DONE /api/tasks", function () {
  it("returns all done tasks in the database", async function () {
    const endpoint = "/api/tasks/done"
    const response = await request.get(endpoint);
    expect(response.status).to.eql(200);
    response.body.forEach(element => {      
      expect(element.type).to.eql("done");
    });   
  });
});