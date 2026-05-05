import styled from 'styled-components';
import { lightTheme } from '@/themes/themes';
import { Button } from '../components/ui/buttons/Button';

export const StoryControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StoryStateContainer = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

export const ModalsTriggerContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const ModalsStateGrid = styled.section`
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

export const AllExamplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
