import posts_db from "../config/posts_db.js";

class Posts {
  constructor() {
    this.table = "posts";
  }

  async findAll() {
    return await posts_db(this.table).select();
  }

  async findById(id) {
    return await posts_db(this.table).where({ id }).first();
  }

  async create(post) {
    return await posts_db(this.table).insert(post).returning("*");
  }

  async update(id, post) {
    return await posts_db(this.table).where({ id }).update(post).returning("*");
  }

  async delete(id) {
    return await posts_db(this.table).where({ id }).del();
  }
}

export default Posts;
