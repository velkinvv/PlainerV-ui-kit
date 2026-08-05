import React from 'react';
import type { Size } from '../../../types/sizes';
import { RadioButtonLabelPosition } from '../../../types/ui';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import type { TreeSelectionControl } from '../../../types/ui';
import { TreeControlSlot } from './Tree.style';

type TreeNodeControlProps = {
  /** Тип контрола узла */
  selectionControl: TreeSelectionControl;
  /** Размер из Tree */
  size: Size;
  /** Id узла (value для radio) */
  itemId: string;
  /** Подпись для a11y */
  ariaLabel: string;
  /** Имя группы radio на всё дерево */
  radioGroupName: string;
  /** Состояние checkbox */
  checked: boolean;
  /** Indeterminate только для checkbox */
  indeterminate: boolean;
  /** Выбран ли узел (для radio) */
  selected: boolean;
  /** Блокировка */
  disabled: boolean;
  /** Смена checkbox */
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Смена radio */
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Контрол узла Tree: только `Checkbox` / `RadioButton` из UI Kit.
 *
 * @param props.selectionControl - checkbox | radio (иначе null)
 * @param props.size - Размер
 * @param props.itemId - Id узла
 * @param props.ariaLabel - aria-label контрола
 * @param props.radioGroupName - name группы radio
 * @param props.checked - checked checkbox
 * @param props.indeterminate - indeterminate checkbox
 * @param props.selected - selected для radio
 * @param props.disabled - disabled
 * @param props.onCheckboxChange - onChange checkbox
 * @param props.onRadioChange - onChange radio
 */
export const TreeNodeControl = ({
  selectionControl,
  size,
  itemId,
  ariaLabel,
  radioGroupName,
  checked,
  indeterminate,
  selected,
  disabled,
  onCheckboxChange,
  onRadioChange,
}: TreeNodeControlProps) => {
  if (selectionControl === 'checkbox') {
    return (
      <TreeControlSlot
        className="ui-tree-control-slot"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          size={size}
          onChange={onCheckboxChange}
          aria-label={ariaLabel}
        />
      </TreeControlSlot>
    );
  }

  if (selectionControl === 'radio') {
    return (
      <TreeControlSlot
        className="ui-tree-control-slot"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <RadioButton
          checked={selected}
          disabled={disabled}
          size={size}
          name={radioGroupName}
          value={itemId}
          labelPosition={RadioButtonLabelPosition.NONE}
          onChange={onRadioChange}
          aria-label={ariaLabel}
        />
      </TreeControlSlot>
    );
  }

  return null;
};
