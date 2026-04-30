import styled from 'styled-components';

/** ╨в╨╡╨║╤Б╤В-╨┐╨╛╨┤╤Б╨║╨░╨╖╨║╨░ ╨╜╨░╨┤ ╨┤╨╡╨╝╨╛ ╨▓ Storybook */
export const DataGridStoryHint = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** ╨Ю╨▒╤С╤А╤В╨║╨░ ╨┤╨╗╤П ╨║╨╜╨╛╨┐╨║╨╕ + ╤В╨░╨▒╨╗╨╕╤Ж╤Л ╨▓ ╤Б╤В╨╛╤А╨╕╤Б */
export const DataGridStoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
