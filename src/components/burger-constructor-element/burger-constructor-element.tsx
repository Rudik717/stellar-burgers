import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '../../utils/types';
import {
  setIngredients,
  removeIngredient,
  burgerBuilderSelector
} from '../../slices/burger-builder-slice';

type TSwapType = {
  state: TConstructorIngredient[];
  index: number;
  offset: number;
};

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(
      burgerBuilderSelector.selectBuilderState
    );
    const swap = ({ state, index, offset }: TSwapType) => {
      const newState = [...state];
      const swapIndex = index + offset;

      [newState[index], newState[swapIndex]] = [
        newState[swapIndex],
        newState[index]
      ];

      return newState;
    };

    const handleMoveDown = () => {
      dispatch(
        setIngredients(
          swap({
            state: constructorItems.ingredients,
            index: index,
            offset: 1
          })
        )
      );
    };

    const handleMoveUp = () => {
      dispatch(
        setIngredients(
          swap({
            state: constructorItems.ingredients,
            index: index,
            offset: -1
          })
        )
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
