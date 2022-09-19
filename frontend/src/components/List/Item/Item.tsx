import React from 'react';
import Button from '../../Button/Button';
import {ItemI} from '../../../@types';
import useLongPress from '../../../hooks/useLongPress';

const Item = ({
    item, 
    onItemClick, 
    selectedItems,
    setSelectedItems,
    stockList, 
    setStockList
}: {
    item:  ItemI, 
    onItemClick: (e: React.TouchEvent<HTMLElement>, item: ItemI) => void, 
    selectedItems: ItemI[], 
    setSelectedItems: React.Dispatch<React.SetStateAction<ItemI[]>>,
    stockList: ItemI[], 
    setStockList: React.Dispatch<React.SetStateAction<ItemI[]>>
}): JSX.Element => {
    const onLongPress = (e: React.TouchEvent<HTMLElement>) => {
        onItemClick(e, item);
    };
    
    const onClick = (e: React.TouchEvent<HTMLElement>) => {
        let doesExistInSelectedItems = false;
        for (let j = 0; j < selectedItems.length; j++) {
            const selectedName = selectedItems[j].name;
            if (selectedName !== item.name) {
                doesExistInSelectedItems = true;
            }
        }
        if (doesExistInSelectedItems) {
            if ((e.target as HTMLTextAreaElement).className === 'default-btn') return;
        }
        if (selectedItems.length > 0) {
            onItemClick(e, item);
        }
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions) as unknown as React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    
    const alterItemCount = (amount: number) => {
        let doesExistInSelectedItems = false;
        for (let j = 0; j < selectedItems.length; j++) {
            const selectedName = selectedItems[j].name;
            if (selectedName === item.name) {
                doesExistInSelectedItems = true;
            }
        }
        let updatedStockList: ItemI[] = [];
        let updatedSelectedItems = [];
        if(!doesExistInSelectedItems) {
            updatedStockList = stockList.map((i) => {
                if (i.name === item.name) {
                    const newTotal = ((item.count + amount) < 0) ? 0 : (item.count + amount);
                    return {...item, count: newTotal};
                }
                return i;
            });
        } else {
            updatedSelectedItems = [...selectedItems];
            for (let j = 0; j < updatedSelectedItems.length; j++) {
                updatedSelectedItems[j].count += amount;
            }
            setSelectedItems(updatedSelectedItems);
            updatedStockList = [...stockList];
            for (let j = 0; j < stockList.length; j++) {
                for (let k = 0; k < updatedSelectedItems.length; k++) {
                    if (stockList[j].name === updatedSelectedItems[k].name) {
                        updatedStockList[j].count = updatedSelectedItems[k].count;
                    }
                }
            }
        }
        setStockList(updatedStockList);
        localStorage.setItem('stockList', JSON.stringify(updatedStockList));
    };

    return (
        <div className='list-item' style={{border: (selectedItems.filter(i => i.name === item.name).length > 0) ? '2px solid blue' : '2px solid black'}} {...longPressEvent}>
            <Button onClick={(e) => {
                e.stopPropagation();
                alterItemCount(-5);
            }}>-5</Button>
            <Button onClick={(e) => {
                e.stopPropagation();
                alterItemCount(-1);
            }}>-</Button>
            <div>
                <span>{item.name} </span>
                <span>{item.count}</span>
            </div>
            <Button onClick={(e) => {
                e.stopPropagation();
                alterItemCount(1);
            }}>+</Button>
            <Button onClick={(e) => {
                e.stopPropagation();
                alterItemCount(5);
            }}>+5</Button>
        </div>
    );
};

export default Item;