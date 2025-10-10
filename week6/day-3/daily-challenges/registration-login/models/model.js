import register_login_db from "../config/register-login_db.js";
import bcrypt from "bcrypt";

class UsersModel {
  constructor() {
    this.table = "users";
  }

  async register(userData) {
    const { email, username, password, first_name, last_name } = userData;

    return register_login_db.transaction(async (trx) => {
      const [user] = await trx(this.table)
        .insert({
          email,
          username,
          first_name,
          last_name,
        })
        .returning(["id", "email", "username", "first_name", "last_name"]);

      const hashedPassword = await bcrypt.hash(password, 10);

      await trx("hashpwd").insert({
        username,
        password: hashedPassword,
      });
      return user;
    });
  }

  async findByUsername(username) {
    const user = await register_login_db(this.table)
      .where({ username })
      .first();
    const hashpwd = await register_login_db("hashpwd")
      .where({ username })
      .first();

    if (user) {
      return { ...user, password: hashpwd.password };
    }
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async findAllUsers() {
    return await register_login_db.select().from(this.table);
  }

  async findUserById(id) {
    const user = await register_login_db(this.table).where({ id }).first();
    return user;
  }

  async updateUser(id, userData) {
    const { email, first_name, last_name } = userData;
    return await register_login_db(this.table)
      .where({ id })
      .update({ email, first_name, last_name })
      .returning("*");
  }

}

export default UsersModel;
