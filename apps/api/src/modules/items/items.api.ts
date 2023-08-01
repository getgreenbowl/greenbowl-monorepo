import { Router } from 'express';
import { success } from 'proses-response';
import { Transaction } from 'sequelize';
import DbConnection from '../../core/db/db';
import ah from '../../core/utils/async-handler.util';
import { ModelOptions } from '../../libs/list-filter';
import { ItemImages } from './models/images.model';
import { ItemIngredients } from './models/item-ingredients.model';
import { Item } from './models/item.model';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_item, v_param_id } from 'greenbowl-schema';
import Session from '../../core/middlewares/jwt.middleware';

const ItemRouter = Router();

//add new item in menu
ItemRouter.post(
  '/',
  ah(async (req, res) => {
    const t: Transaction = await DbConnection.db.transaction();
    try {
      const payload = req.body;
      const item = await Item.create(payload, { transaction: t });
      if (payload?.ingredients?.length) {
        const ingredients = payload.ingredients.map((ingredientID: any) => ({
          itemID: item.id,
          ingredientID,
        }));
        await ItemIngredients.bulkCreate(ingredients, { transaction: t });
      }
      await t.commit();
      success(res, item, 'New item added in menu');
    } catch (error) {
      await t.rollback();
      throw error;
    }
  })
)
  .post(
    '/add-images',
    ah(async (req, res) => {
      //TODO::add multer middleware
      const images = req.body;
      await ItemImages.bulkCreate(images);
      success(res, images, 'Image added');
    })
  )
  .post(
    '/update/:id',
    validate({ body: v_item.omit({ id: true }) }),
    ah(async (req, res) => {
      const [update] = await Item.update(req.body, {
        where: { id: req.params.id },
      });
      success(res, update, 'Item updated');
    })
  )
  .get(
    '/',
    ModelOptions.build(),
    ah(async (req, res) => {
      const items = await Item.findAndCountAll(req.modelOptions);
      success(res, items, 'All items');
    })
  )
  .get(
    '/:id',
    // Session.secure,
    validate({ params: v_param_id }),
    ah(async (req, res) => {
      const item = await Item.findByPk(req.params.id);
      success(res, item, 'Item by id');
    })
  )
  .get(
    '/simple-list',
    ah(async (req, res) => {
      const items = await Item.findAll({ where: { isActive: true } });
      success(res, items, 'active items');
    })
  );

export default ItemRouter;
