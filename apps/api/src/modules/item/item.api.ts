import { Router } from "express";
import { success } from "proses-response";
import ah from "../../core/utils/async-handler.util";
import { Item } from "./models/item.model";
import { Transaction } from "sequelize";
import DbConnection from "../../core/db/db";
import { ItemIngredients } from "./models/item-ingredients.model";
import { ItemImages } from "./models/images.model";
import { Menu } from "../menu/models/menu.model";

const ItemRouter = Router();

//add new item in menu
ItemRouter.post(
  "/",
  ah(async (req, res) => {
    const t: Transaction = await DbConnection.instance.transaction();
    try {
      const payload = req.body;
      const item = await Item.create(payload, { transaction: t });
      if (payload.ingredients.length) {
        const ingredients = payload.ingredients.map((ingredientID:any) => ({
          itemID: item.id,
          ingredientID,
        }));
        await ItemIngredients.bulkCreate(ingredients, { transaction: t });
      }
      await t.commit();
      success(res, item, "New item added in menu");
    } catch (error) {
      await t.rollback();
      throw error;
    }
  })
)
.post(
  "/add-images",
  ah(async (req, res) => {
    //TODO::add multer middleware
    const images = req.body;
    await ItemImages.bulkCreate(images);
    success(res, images, "Image added");
  })
)
.post('/update', ah(async(req, res) => {
    //update item
}))
.get('/', ah(async (req, res) => {
  const items = await Item.findAndCountAll({include: [{model: Menu}]});
  success(res, items, 'All items')
}))

export default ItemRouter;
