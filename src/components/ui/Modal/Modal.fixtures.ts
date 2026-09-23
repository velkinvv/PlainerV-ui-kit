import { ModalSize } from '../../../types/sizes';

export type ModalSizeOption = {
  label: string;
  size: ModalSize;
  description: string;
};

export const modalSizeOptions: ModalSizeOption[] = [
  {
    label: 'Small',
    size: ModalSize.SM,
    description: 'Компактное модальное окно для подтверждений',
  },
  {
    label: 'Medium',
    size: ModalSize.MD,
    description: 'Стандартное модальное окно',
  },
  {
    label: 'Large',
    size: ModalSize.LG,
    description: 'Большое модальное окно для сложного контента',
  },
  {
    label: 'Full Screen',
    size: ModalSize.FULL,
    description: 'Полноэкранное модальное окно',
  },
];
