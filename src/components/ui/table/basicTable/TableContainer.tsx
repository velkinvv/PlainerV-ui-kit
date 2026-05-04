import React, { forwardRef } from 'react';
import type { TableContainerProps } from '@/types/ui';
import { TableContainerRoot } from './Table.style';

/**
 * ╨Ю╨▒╤С╤А╤В╨║╨░ ╤В╨░╨▒╨╗╨╕╤Ж╤Л: ╤Б╨║╤А╤Г╨│╨╗╨╡╨╜╨╕╨╡, ╤Д╨╛╨╜ ╨║╨░╤А╤В╨╛╤З╨║╨╕, ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╤Л╨╣ ╤Б╨║╤А╨╛╨╗╨╗.
 * @param props.component - ╨Ъ╨╛╤А╨╜╨╡╨▓╨╛╨╣ ╤В╨╡╨│ (╨┐╨╛ ╤Г╨╝╨╛╨╗╤З╨░╨╜╨╕╤О `div`)
 * @param props.elevated - ╨Я╨╛╨║╨░╨╖╨░╤В╤М ╤В╨╡╨╜╤М
 * @param props.className - CSS-╨║╨╗╨░╤Б╤Б
 * @param props.children - ╨Ю╨▒╤Л╤З╨╜╨╛ `Table`
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ component, elevated = true, className, children, style, ...rest }, ref) => {
    const Root = (component ?? 'div') as React.ElementType;
    return (
      <TableContainerRoot ref={ref} as={Root} className={className} style={style} $elevated={elevated} {...rest}>
        {children}
      </TableContainerRoot>
    );
  },
);

TableContainer.displayName = 'TableContainer';
