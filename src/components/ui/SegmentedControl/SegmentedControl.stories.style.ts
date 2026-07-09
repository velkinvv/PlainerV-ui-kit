import styled from 'styled-components';

export const SegmentedControlStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`;

export const SegmentedControlStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SegmentedControlStoriesCaption = styled.p`
  margin: 0 0 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SegmentedControlStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;
