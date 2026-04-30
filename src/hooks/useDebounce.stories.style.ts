import styled from 'styled-components';
import { Input } from '../components/ui/inputs/Input';
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

export const ThreeColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`;

export const StatusContainer = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

export const NumberInput = styled(Input)`
  width: 100px;
  margin-bottom: 12px;
`;

export const ReadOnlyInputMuted = styled(Input)`
  background-color: #f8f9fa;
`;

export const ReadOnlyInputSuccess = styled(Input)`
  background-color: #d4edda;
  border-color: #c3e6cb;
`;

export const ReadOnlyInputWarning = styled(Input)`
  background-color: #fff3cd;
  border-color: #ffeaa7;
`;

export const ReadOnlyInputDanger = styled(Input)`
  background-color: #f8d7da;
  border-color: #f5c6cb;
`;

export const QueryValueCard = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
`;

export const SourceQueryCard = styled(QueryValueCard)`
  background-color: #f8f9fa;
`;

export const DebouncedQueryCard = styled(QueryValueCard)`
  background-color: #e3f2fd;
  border-color: #2196f3;
`;

export const CenteredMessage = styled.div`
  padding: 12px;
  text-align: center;
  color: #6c757d;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ResultItem = styled.div`
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
`;

export const LogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const LogContainer = styled.div`
  max-height: 200px;
  overflow: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;

export const LogEntry = styled.div<{ $isLast: boolean; $isEven: boolean }>`
  padding: 8px 12px;
  border-bottom: ${({ $isLast }) => ($isLast ? 'none' : '1px solid #dee2e6')};
  background-color: ${({ $isEven }) => ($isEven ? '#f8f9fa' : 'white')};
`;

export const LogEntryText = styled(Typography)`
  font-size: 12px;
`;

export const AllExamplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
