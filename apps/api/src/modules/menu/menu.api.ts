import { Router } from 'express';
import { other, success } from 'proses-response';
import ah from '../../core/utils/async-handler.util';
import { Menu } from './models/menu.model';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_menu } from 'greenbowl-schema';

const MenuRouter = Router();

//add new menu
MenuRouter.post(
  '/',
  validate({ body: v_menu.pick({ name: true }) }),
  ah(async (req, res) => {
    const [menu, created] = await Menu.findOrCreate({
      where: { name: req.body.name },
    });

    if (!created) {
      other(res, 'Menu exists');
    }
    success(res, menu, 'New menu added');
  })
).get(
  '/',
  ah(async (req, res) => {
    const menu = await Menu.findAll();
    success(res, menu, 'all menu');
  })
);

export default MenuRouter;
