import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetBuilder,
  burgerBuilderSelector
} from '../../slices/burger-builder-slice';
import {
  createOrder,
  resetOrder,
  getOrderIsLoading,
  getOrder
} from '../../slices/new_order_slice';
import { isAuthSelector } from '../../slices/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    burgerBuilderSelector.selectBuilderState
  );
  const orderRequest = useSelector(getOrderIsLoading);
  const orderModalData = useSelector(getOrder);

  const onOrderClick = () => {
    if (!isAuth) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(createOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(resetBuilder());
    dispatch(resetOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
