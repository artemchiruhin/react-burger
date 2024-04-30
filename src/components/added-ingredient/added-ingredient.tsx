import React, {useCallback, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import type { Identifier, XYCoord } from 'dnd-core'
import {IIngredient} from '../../interfaces/IIngredient';
import styles from './added-ingredient.module.css';
import {deleteIngredient, sortIngredients} from '../../services/actions/ingredients';
import {useDrag, useDrop} from 'react-dnd';
import {IDragItem} from '../../interfaces/IDragItem';

interface IAddedIngredient {
    ingredient: IIngredient,
    index: number,
}

export const AddedIngredient = ({ ingredient, index }: IAddedIngredient) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const onDeleteIngredient = useCallback((ingredient: IIngredient) => {
        dispatch(deleteIngredient(ingredient.uniqueId || ingredient._id));
    }, [dispatch]);

    const [, drop] = useDrop<IDragItem, void, { handlerId: Identifier | null }>(() => ({
        accept: 'sortingIngredient',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(sortIngredients(dragIndex, hoverIndex));

            item.index = hoverIndex
        },
    }));

    const [, drag] = useDrag(() => ({
        type: 'sortingIngredient',
        item: { id: ingredient._id, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    drag(drop(ref));

    return (
        <div className={`${styles['element-wrapper']}`} key={ingredient.uniqueId || ingredient._id} ref={ref}>
            <div className={`${styles['element-drag']}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                extraClass={`${styles['element']}`}
                handleClose={() => onDeleteIngredient(ingredient)}
            />
        </div>
    );
}