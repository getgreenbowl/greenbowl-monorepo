import { Router } from 'express';
import { v_item, v_param_id } from 'greenbowl-schema';
import { serverError, success } from 'proses-response';
import { Transaction } from 'sequelize';
import DbConnection from '../../core/db/db';
import { Cacher } from '../../core/middlewares/cache.middleware';
import { validate } from '../../core/middlewares/validation.middleware';
import ah from '../../core/utils/async-handler.util';
import { ModelOptions } from '../../libs/list-filter';
import { ItemImages } from './models/images.model';
import { ItemIngredients } from './models/item-ingredients.model';
import { Item } from './models/item.model';
import { Cache } from '../../core/cache/cache-model';
import { z } from 'zod';

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
      clearItemRelatedCache();

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
    validate({
      body: v_item
        .omit({ id: true, ingredients: true })
        .extend({ ingredients: z.array(z.number()) }),
    }),
    ah(async (req, res) => {
      const t: Transaction = await DbConnection.db.transaction();

      try {
        const { ingredients, ...payload } = req.body;
        const [update] = await Item.update(payload, {
          where: { id: req.params.id },
          transaction: t,
        });

        await ItemIngredients.destroy({
          where: { itemID: req.params.id },
          transaction: t,
        });

        if (ingredients?.length) {
          const ingredientPayload = ingredients.map((ingredientID: any) => ({
            itemID: req.params.id,
            ingredientID,
          }));
          await ItemIngredients.bulkCreate(ingredientPayload, {
            transaction: t,
          });
        }

        clearItemRelatedCache();
        t.commit();
        success(res, update, 'Item updated');
      } catch (error) {
        t.rollback();
        serverError(res, error);
      }
    })
  )
  .get(
    '/',
    Cacher.cache('items-paginated-list'),
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
      const item = await Item.findByPk(req.params.id, {
        include: [{ model: ItemIngredients, as: 'ingredients' }],
      });
      success(res, item, 'Item by id');
    })
  )
  .get(
    '/simple-list',
    Cacher.cache('items-simple-list'),
    ah(async (req, res) => {
      const items = await Item.findAll({ where: { isActive: true } });
      success(res, items, 'active items');
    })
  );

export default ItemRouter;

function clearItemRelatedCache() {
  Cache.clearCacheByGroup('items-paginated-list');
}
