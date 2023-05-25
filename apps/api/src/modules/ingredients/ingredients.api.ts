import { Router } from "express";
import ah from "../../core/utils/async-handler.util";
import { Ingredients } from "./models/ingredients.model";
import { success } from "proses-response";
const IngredientsRouter = Router();

IngredientsRouter
.post(
  "/",
  ah(async (req, res) => {})
)
.put(
    '/',
    ah(async(req, res) => {})
)
.get('/', ah(async(req, res) => {
  const ingredients = await Ingredients.findAll({where: {isActive: true}});
  success(res, ingredients, 'active ingredients')
}))

export default IngredientsRouter