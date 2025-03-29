import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHolding, faGift, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();
  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
      <div className="inventory-control">
        <div className="inventory-control-wrapper">
          <input
            className="inventory-control-input"
            type="number"
            defaultValue={itemAmount}
            onChange={inputHandler}
            min={0}
            placeholder="Amount"
            aria-label="Item amount"
          />

          <button className="inventory-control-button" ref={use}>
            <FontAwesomeIcon icon={faHandHolding} style={{ marginRight: '8px' }} />
            {Locale.ui_use || 'Use'}
          </button>

          <button className="inventory-control-button" ref={give}>
            <FontAwesomeIcon icon={faGift} style={{ marginRight: '8px' }} />
            {Locale.ui_give || 'Give'}
          </button>

          <button className="inventory-control-button" onClick={() => fetchNui('exit')}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
            {Locale.ui_close || 'Close'}
          </button>
        </div>
      </div>

      <div className="tooltip-container">
        <button className="useful-controls-button" onClick={() => setInfoVisible(true)}>
          <FontAwesomeIcon icon={faInfoCircle} size="2x" />
        </button>
      </div>

    </>
  );
};

export default InventoryControl;
