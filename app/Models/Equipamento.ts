import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Equipamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public slug: string;

  @column()
  public tipo: string;

  @column()
  public image: string;

  @column()
  public descricao: string;

  @column()
  public modelo: string;

  @column()
  public fabricante: string;

  @column()
  public data_fabricacao: Date;

  @column()
  public preco_compra: number;

  @column()
  public quantidade_stock: number;

  @column()
  public _csrf: string;

  @column()
  public hora_equipamento: DateTime;

  @column()
  public codigo: string;

  @column()
  public data_equipamento: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
