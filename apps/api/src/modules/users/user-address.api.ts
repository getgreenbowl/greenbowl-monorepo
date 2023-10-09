import { Router } from 'express';
import ah from '../../core/utils/async-handler.util';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_param_id, v_user_address } from 'greenbowl-schema';
import { UserAddress } from './models/user-address.model';
import { success } from 'proses-response';
import Session from '../../core/middlewares/jwt.middleware';

const UserAddressRouter = Router();

UserAddressRouter.route('/')
  .post(
    validate({ body: v_user_address.omit({ id: true, userID: true }) }),
    ah(async (req, res) => {
      const addr = await UserAddress.create({
        ...req.body,
        userID: req.user.id,
      });
      success(res, addr, 'Address added');
    })
  )
  .get(
    ah(async (req, res) => {
      const addressList = await UserAddress.findAll({
        where: { userID: req.user.id },
      });
      success(res, addressList, 'Address list');
    })
  )
  .put(
    validate({ body: v_user_address.omit({ userID: true }) }),
    ah(async (req, res) => {
      const [updated] = await UserAddress.update(req.body, {
        where: { id: req.body.id },
      });
      success(res, updated, 'Address updated');
    })
  )
  .delete(
    validate({ query: v_param_id }),
    ah(async (req, res) => {
      const result = await UserAddress.destroy({ where: { id: req.query.id } });
      success(res, result, 'Address deleted');
    })
  );

export default UserAddressRouter;
