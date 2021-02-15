const request = require("supertest");
const app = require("../app");

describe("Likes", () => {
  it("should be able to give a like to the repository", async () => {
    const repository = await request(app)
      .post("/repository")
      .send({
        url: "https://github.com/cleytonrs/back-end-repository",
        title: "Repository",
        techs: ["Node", "Express", "TypeScript"]
      });

    let response = await request(app).post(
      `/repository/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app).post(
      `/repository/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("should not be able to like a repository that does not exist", async () => {
    await request(app)
      .post(`/repository/123/like`)
      .expect(400);
  });
});
