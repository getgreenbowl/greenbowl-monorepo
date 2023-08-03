import { Router } from 'express';
import ah from '../../core/utils/async-handler.util';
import { Ingredients } from './models/ingredients.model';
import { success } from 'proses-response';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_ingredients } from 'greenbowl-schema';
const IngredientsRouter = Router();

IngredientsRouter.post(
  '/',
  validate({ body: v_ingredients.pick({ name: true }) }),
  ah(async (req, res) => {
    const ingredients = await Ingredients.create({
      name: req.body.name,
      isActive: true,
    });
    success(res, ingredients, 'Ingredient created');
  })
)
  .put(
    '/',
    ah(async (req, res) => {})
  )
  .get(
    '/',
    ah(async (req, res) => {
      const ingredients = await Ingredients.findAll({
        where: { isActive: true },
      });
      success(res, ingredients, 'active ingredients');
    })
  );

export default IngredientsRouter;
