import styled from 'styled-components';
import { InputWrapper } from '../shared';

export const TextAreaWrapper = styled(InputWrapper)`
  align-items: flex-start;
`;

export const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: prop => !['textAlign', 'readOnly', 'resize'].includes(prop),
})<{
  textAlign?: 'left' | 'center' | 'right';
  readOnly?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors.text};
  text-align: ${({ textAlign = 'left' }) => textAlign};
  width: 100%;
  min-height: 96px;
  resize: ${({ resize = 'vertical' }) => resize};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
    opacity: 1;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textTertiary};
    cursor: not-allowed;
  }

  ${({ readOnly }) =>
    readOnly &&
    `
      cursor: default;
      resize: none;
    `}
`;
