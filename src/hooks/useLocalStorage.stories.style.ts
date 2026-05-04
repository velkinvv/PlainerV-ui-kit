import styled from 'styled-components';
import { Button } from '../components/ui/buttons/Button';
import { Typography } from '../components/ui/Typography';

export const SectionContainer = styled.section`
  margin-bottom: 16px;
`;

export const TwoColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionsRowTop = styled(ActionsRow)`
  margin-top: 8px;
`;

export const ActionsRowCenter = styled(ActionsRow)`
  align-items: center;
`;

export const ActionsRowWrap = styled(ActionsRow)`
  flex-wrap: wrap;
`;

export const StatusContainer = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

export const UserJsonPreview = styled.pre`
  font-size: 12px;
  overflow: auto;
`;

export const CounterValue = styled(Typography)`
  margin: 0 16px;
`;

export const EmptyItemsText = styled(Typography)`
  color: #6c757d;
  font-style: italic;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
`;

export const RemoveItemButton = styled(Button)`
  padding: 4px 8px;
  min-width: auto;
`;

export const AllExamplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
