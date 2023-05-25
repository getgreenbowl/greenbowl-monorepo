import { Router } from "express";
import { other, success} from "proses-response";
import ah from "../../core/utils/async-handler.util";
import { Menu } from "./models/menu.model";

const MenuRouter = Router();

//add new menu
MenuRouter
.post('/', ah(async(req, res) => {
    const payload = req.body;
    const menu = await Menu.create(payload);
    success(res, menu, 'New menu added');
}))
.get('/', ah(async(req, res) => {
    const menu = await Menu.findAll();
    success(res, menu, 'all menu')
}))

export default MenuRouter;
