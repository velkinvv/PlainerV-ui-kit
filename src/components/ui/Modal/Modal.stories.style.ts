import styled from 'styled-components';
import { Button } from '../buttons/Button';
import { Typography } from '../Typography';

export const ModalContentActions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const FocusContentStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FocusInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FocusInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

export const ButtonsSlotGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
`;

export const RowGap8 = styled.div`
  display: flex;
  gap: 8px;
`;

export const ColumnGap12 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RelativePortalContainer = styled.div`
  position: relative;
  padding: 24px;
`;

export const PortalArea = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

export const FooterHintText = styled.p`
  margin: 0;
  color: #6b7280;
`;

export const EndAlignedActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ContentPadding24 = styled.div`
  padding: 24px;
`;

export const CenteredContentPadding24 = styled(ContentPadding24)`
  text-align: center;
`;

export const WarningIconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #fef3c7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 32px;
`;

export const CenteredActionRow = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const FormStack = styled.form`
  margin-top: 16px;
`;

export const FormField = styled.div`
  margin-bottom: 16px;
`;

export const FormFieldLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
`;

export const FormActionsRow = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const SizesButtonsWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const DashedContainer = styled.div`
  border: 1px dashed #cbd5f5;
  padding: 24px;
  border-radius: 12px;
  position: relative;
  min-height: 220px;
`;

export const InnerOverlayContainer = styled.div`
  position: absolute;
  inset: 16px;
  pointer-events: none;
  border-radius: 8px;
  overflow: hidden;
`;

export const VariantLabelButton = styled(Button)<{ $isActive: boolean }>`
  ${({ $isActive }) => `
    opacity: ${$isActive ? 1 : 0.85};
  `}
`;

export const ReadableParagraph = styled(Typography)`
  line-height: 1.5;
`;
