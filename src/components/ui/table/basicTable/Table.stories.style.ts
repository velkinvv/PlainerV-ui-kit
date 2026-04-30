import styled from 'styled-components';
import { TableCell } from './TableCell';

/** ╨У╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╤Л╨╣ ╤А╤П╨┤ ╨▓╨╜╤Г╤В╤А╨╕ ╤П╤З╨╡╨╣╨║╨╕ (╨░╨▓╨░╤В╨░╤А + ╤В╨╡╨║╤Б╤В, ╨╕ ╤В.╨┐.). */
export const StoryTableInline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

/**
 * ╨Ъ╨╜╨╛╨┐╨║╨░ ┬л╨Ч╨░╨│╤А╤Г╨╖╨╕╤В╤М ╨▒╨╛╨╗╤М╤И╨╡┬╗ ╨▓ ╨┐╨╛╨┤╨▓╨░╨╗╨╡ ╤В╨░╨▒╨╗╨╕╤Ж╤Л (╨║╨░╨║ ╤Б╤Б╤Л╨╗╨║╨░ ╤Б ╨╕╨║╨╛╨╜╨║╨╛╨╣ ╤И╨╡╨▓╤А╨╛╨╜╨░).
 * @param $disabled тАФ ╨▓╨╕╨╖╤Г╨░╨╗╤М╨╜╨╛ ╨┐╤А╨╕╨│╨╗╤Г╤И╨╕╤В╤М (╨╛╨┐╤Ж╨╕╨╛╨╜╨░╨╗╤М╨╜╨╛ ╨┤╨╗╤П ╤Б╤В╨╛╤А╨╕╤Б)
 */
export const StoryTableLoadMore = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0;
  padding: 4px 8px;
  border: 0;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  font-weight: ${({ theme }) => theme.fontWeights?.medium ?? 500};
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 0.85)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 6px;
  }
`;

/** ╨п╤З╨╡╨╣╨║╨░ ╨┐╨╛╨┤╨▓╨░╨╗╨░ ╨╜╨░ ╨▓╤Б╤О ╤И╨╕╤А╨╕╨╜╤Г ╨┐╨╛╨┤ ┬л╨Ч╨░╨│╤А╤Г╨╖╨╕╤В╤М ╨▒╨╛╨╗╤М╤И╨╡┬╗. */
export const StoryTableLoadMoreCell = styled(TableCell).attrs({
  colSpan: 7,
  align: 'center',
})`
  padding: 16px 12px;
`;

/** ╨б╤З╤С╤В╤З╨╕╨║ ╨║╨╗╨╕╨║╨╛╨▓ ╤А╤П╨┤╨╛╨╝ ╤Б ╨┐╨╛╨┤╨┐╨╕╤Б╤М╤О (╨┤╨╗╤П ╤Б╤В╨╛╤А╨╕╤Б). */
export const StoryLoadMoreHint = styled.span`
  margin-left: 4px;
  font-size: 12px;
  opacity: 0.85;
  color: inherit;
`;
