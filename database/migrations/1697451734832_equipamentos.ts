import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "equipamentos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("nome");
      table.string("slug").unique();
      table.string("descricao");
      table.string("tipo");
      table.string("image");
      table.string("modelo");
      table.string("fabricante");
      table.date("data_fabricacao");
      table.integer("preco_compra");
      table.integer("preco_venda");
      table.integer("quantidade_stock");
      table.integer("csrf");
      table.time("hora_equipamento");
      table.date("data_equipamento");
      table.string("codigo");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
