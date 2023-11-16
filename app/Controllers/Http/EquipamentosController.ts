import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Equipamento from "App/Models/Equipamento";
import Database from "@ioc:Adonis/Lucid/Database";
import Application from "@ioc:Adonis/Core/Application";
import { v4 as uuidv4 } from "uuid";
import { string } from "@ioc:Adonis/Core/Helpers";

string.generateRandom(32);

export default class EquipamentosController {
  private validationOptions = {
    size: "2mb",
    extnames: ["jpg", "jpeg", "png"],
  };

  public async index({ view, response }: HttpContextContract) {
    try {
      const equipamentos = await Equipamento.all();
      const totalEquipamentos = equipamentos.length;

      const somaPrecoCompra = await Database.from("equipamentos").sum(
        "preco_compra as preco"
      );
      const somaQuantidadeStock = await Database.from("equipamentos").sum(
        "quantidade_stock as quantidade"
      );
      const totalQuantidadeStock = parseFloat(
        somaQuantidadeStock[0].quantidade
      );
      const totalPrecoCompra = parseFloat(somaPrecoCompra[0].preco);

      return view.render("home", {
        equipamentos,
        totalEquipamentos,
        totalPrecoCompra,
        totalQuantidadeStock,
        title: "Home",
      });
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os equipamentos:", error);
      return response.redirect().toPath("/equipamentos");
    }
  }

  public async create({ view, response }: HttpContextContract) {
    try {
      return view.render("equipamentos/create", {});
    } catch (error) {
      console.error(
        "Ocorreu um erro ao renderizar a página de criação de equipamentos:",
        error
      );
      return response.redirect().toPath("/equipamentos");
    }
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const data = await request.body();
      const image = request.file("image", this.validationOptions);

      if (image) {
        const imageName = `${uuidv4()}.${image!.extname}`;

        await image.move(Application.publicPath("images-2"), {
          name: imageName,
        });

        data.image! = imageName;
      }

      const documento_codigo = string.generateRandom(10);
      data.codigo = documento_codigo;

      await Equipamento.create(data);
      session.flash("notification", "Sucesso ao salvar!");
      return response.redirect().toPath("/equipamentos");
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async show({ view, params }: HttpContextContract) {
    const equipamento = await Equipamento.find(params.id);
    return view.render("equipamentos/show", { equipamento });
  }

  public async edit({ view, params, session, response }: HttpContextContract) {
    try {
      const equipamento = await Equipamento.find(params.id);

      if (!equipamento) {
        session.flash("notification", "Equipamento não encontrado");
        return response.redirect().back();
      }

      return view.render("equipamentos/edit", { equipamento });
    } catch (error) {
      session.flash("notification", "Ocorreu um erro ao editar o equipamento");
      return response.redirect().back();
    }
  }

  public async update({
    params,
    request,
    response,
    session,
  }: HttpContextContract) {
    try {
      const data = request.body();
      const equipamento = await Equipamento.findBy("id", params.id);

      const image = request.file("image", this.validationOptions);

      if (image) {
        const imageName = `${uuidv4()}.${image!.extname}`;

        await image.move(Application.publicPath("images-2"), {
          name: imageName,
        });

        data.image! = imageName;
      }

      equipamento!.merge(data);
      await equipamento!.save();

      session.flash("notification", "Sucesso ao atualizar!");
      return response.redirect().toPath("/equipamentos");
    } catch (error) {
      session.flash(
        "notification",
        "Ocorreu um erro ao atualizar o equipamento"
      );
      return response.redirect().toPath("/equipamentos");
    }
  }
  public async destroy({ response, params, session }: HttpContextContract) {
    try {
      const equipamento = await Equipamento.find(params.id);

      if (!equipamento) {
        session.flash("notification", "Equipamento não encontrado");
        return response.redirect().toPath("/equipamentos");
      }

      await equipamento!.delete();
      session.flash("notification", "Sucesso ao deletar!");
      return response.redirect().toPath("/equipamentos");
    } catch (error) {
      session.flash("notification", "Ocorreu um erro ao deletar o equipamento");
      return response.redirect().toPath("/equipamentos");
    }
  }
}
