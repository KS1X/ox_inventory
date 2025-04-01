import { Locale } from '../../store/locale';
import React from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  infoVisible: boolean;
  setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsefulControls: React.FC<Props> = ({ infoVisible, setInfoVisible }) => {
  const { refs, context } = useFloating({
    open: infoVisible,
    onOpenChange: setInfoVisible,
  });

  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
  });

  const { isMounted, styles } = useTransitionStyles(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay lockScroll className="useful-controls-dialog-overlay" data-open={infoVisible} style={styles}>
            <FloatingFocusManager context={context}>
              <div ref={refs.setFloating} {...getFloatingProps()} className="useful-controls-dialog" style={styles}>
                <div className="useful-controls-dialog-title">
                  <p>{Locale.ui_usefulcontrols || 'Inventory controls'}</p>
                  <div className="useful-controls-dialog-close" onClick={() => setInfoVisible(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
                <div className="useful-controls-content-wrapper">
                  <p>
                    <kbd>RMB - Move items</kbd>
                    <br />
                    {Locale.ui_rmb}
                  </p>
                  <p>
                    <kbd>ALT + LMB - Quick move</kbd>
                    <br />
                    {Locale.ui_alt_lmb}
                  </p>
                  <p>
                    <kbd>CTRL + LMB</kbd>
                    <br />
                    {Locale.ui_ctrl_lmb}
                  </p>
                  <p>
                    <kbd>SHIFT + Drag - split quantity of item</kbd>
                    <br />
                    {Locale.ui_shift_drag}
                  </p>
                  <p>
                    <kbd>CTRL + SHIFT + LMB - quick move something?</kbd>
                    <br />
                    {Locale.ui_ctrl_shift_lmb}
                  </p>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
};

export default UsefulControls;
