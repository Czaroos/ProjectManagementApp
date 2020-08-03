import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

import { Button, SelectBase } from 'ui';

import csx from './ControlButton.scss';

namespace ControlButton {
  export interface Props extends Partial<SelectBase.ChildrenInjectedProps> {
    value: { [key: string]: boolean };
  }
}

const useStyles = makeStyles({
  btn: {
    height: '100%',
    padding: 0,
    borderRight: '1px solid rgba(51, 129, 225, 0.41)',
    borderLeft: '1px solid rgba(51, 129, 225, 0.41)',
    borderRadius: 0
  }
});

const getSelectedCount = (value: { [key: string]: boolean }) =>
  Object.values(value).filter(v => v).length;

const ControlButton = memo(
  ({ value, onClick }: ControlButton.Props) => {
    const classes = useStyles();

    const selectedCount = getSelectedCount(value);

    return (
      <Button
        className={`${classes.btn} ${csx.btn} ${selectedCount > 0 ? csx.active : ''}`}
        theme="primaryTransparent"
        onClick={onClick}
      >
        <CodeIcon />
        <b>{selectedCount > 0 ? selectedCount : 'All'}</b>
      </Button>
    );
  },
  (prev, next) => prev.value === next.value
);

export default ControlButton;