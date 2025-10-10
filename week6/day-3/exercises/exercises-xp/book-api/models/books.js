import book_db from "../config/book_db.js";

class Books {
  constructor() {
    this.table = "books";
  }

  async findAll() {
    return await book_db.select().from(this.table);
  }
  async createBook(book) {
    const [id] = await book_db(this.table).insert(book).returning("id");
    return { id, ...book };
  }
  async findById(id) {
    return await book_db(this.table).where({ id }).first();
  }
  async updateBook(id, book) {
    return await book_db(this.table).where({ id }).update(book).returning("*");
  }
  async deleteBook(id) {
    return await book_db(this.table).where({ id }).del();
  }
}

export default Books;
