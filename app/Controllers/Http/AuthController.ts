// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from "App/Models/Usuario";

export default class AuthController {

  public async login({ auth, request, response, session }) {
    const email = request.input("email");
    const password = request.input("password");

    await auth.use("web").attempt(email, password);
    session.flash("notification", "Sucesso ao logar!");
    return response.redirect("/equipamentos");
  }

  public async logout({ auth, response }) {
    await auth.use("web").logout();
    response.redirect("/login");
  }

  public async create({ request, response, session }) {
    const data = request.body();

    await Usuario.create(data);
    session.flash("notification", "Sucesso ao criar conta! Faça login!");
    return response.redirect("/login");
  }
}
