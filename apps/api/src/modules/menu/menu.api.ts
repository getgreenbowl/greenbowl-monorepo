import { Router } from "express";
import { other, success} from "proses-response";
import ah from "../../core/utils/async-handler.util";
import { Menu } from "./models/menu.model";

const MenuRouter = Router();

//add Menu
MenuRouter.post("/",
    ah(async (req, res) => {
        try {

            let menu = await Menu.bulkCreate(req.body);
            success(res, menu, "menu added");

        } catch (err) {
            other(err, "Something went wrong. Menu not added");
        }
    })
)

    .get("/",
        ah(async (req, res) => {
            try {
                let menu = await Menu.findAll({ attributes: ['id', 'title', 'link'] });
                success(res, menu, "all menu");
            } catch (err) {
                other(err, "Something went wrong");
            }
        })
    );

export default MenuRouter;
