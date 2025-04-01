import React, { useState, useEffect } from 'react';
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
import { faPerson, faGift, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();
  const [infoVisible, setInfoVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(itemAmount);

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
    const newVal = isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0
      ? 0
      : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(newVal));
    setValue(newVal);
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />

      <div className="inventory-control">
        <div className="inventory-control-wrapper">
        <div className="inventory-control-input-wrapper">
          <input
            id="inventory-input"
            className="inventory-control-input"
            type="number"
            defaultValue={itemAmount}
            onChange={inputHandler}
            min={0}
            placeholder=" " // <-- critical for :placeholder-shown to work
            aria-label="Item amount"
          />
        </div>
        <div className="inventory-control-button-row">
          <motion.button
            className="inventory-control-button inventory-control-button--use"
            ref={use}
            whileTap={{ scale: 0.96 }}
          >
            <FontAwesomeIcon icon={faPerson} style={{ marginRight: '6px' }} />
            {Locale.ui_use || 'Use'}
          </motion.button>
          <motion.button
            className="inventory-control-button inventory-control-button--give"
            ref={give}
            whileTap={{ scale: 0.96 }}
          >
            <FontAwesomeIcon icon={faGift} style={{ marginRight: '6px' }} />
            {Locale.ui_give || 'Give'}
          </motion.button>
        </div>
        <motion.button
          className="inventory-control-button inventory-control-button--close"
          onClick={() => fetchNui('exit')}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
        >
          <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
          {Locale.ui_close || 'Close Inventory'}
        </motion.button>
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
