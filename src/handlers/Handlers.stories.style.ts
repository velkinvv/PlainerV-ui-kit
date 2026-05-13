import { motion } from 'framer-motion';
import styled from 'styled-components';

export const SectionDescription = styled.div`
  margin-bottom: 24px;
`;

/** Сетка обзора хендлеров на базе `motion.div` для stagger-анимации карточек. */
export const HandlersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const HandlerCard = styled.div<{ $backgroundColor: string; $borderColor: string }>`
  padding: 20px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: 2px solid ${({ $borderColor }) => $borderColor};
  border-radius: 12px;
`;

export const HandlerCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const HandlerFeaturesList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

export const HandlerFeatureListItem = styled.li`
  margin-bottom: 4px;
`;

export const PrinciplesBox = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

export const ExamplesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ExampleCard = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
`;

export const ExampleHeader = styled.div`
  margin-bottom: 12px;
`;

export const MutedDescriptionText = styled.div`
  color: #666;
`;

export const CodeBlock = styled.div`
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 6px;
  font-family: Monaco, Consolas, 'Courier New', monospace;
  font-size: 14px;
  overflow: auto;
  user-select: text;
  -webkit-user-select: text;
`;

export const CodePre = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  user-select: text;
  -webkit-user-select: text;
`;

export const IntegrationStepsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const IntegrationStepCard = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
`;

export const IntegrationStepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const StepBadge = styled.div`
  margin-right: 12px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

