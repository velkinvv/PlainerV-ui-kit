import styled from 'styled-components';
import { motion } from 'framer-motion';
import { lightTheme } from '@/themes/themes';
import { Button } from '../components/ui/buttons/Button';

export const StoryControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StoryStateContainer = styled.div`
  padding: 12px;
  background-color: ${lightTheme.colors.backgroundTertiary};
  border-radius: 8px;
`;

export const ModalsTriggerContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

/** Сетка статусов нескольких модалок — на базе motion для stagger при монтировании. */
export const ModalsStateGrid = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

export const ModalStateCard = styled.article`
  padding: 12px;
  background-color: ${lightTheme.colors.backgroundTertiary};
  border-radius: 8px;
`;

export const ColoredTriggerButton = styled(Button)<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;
