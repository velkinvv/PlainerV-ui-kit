import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { LinkProps, LinkButtonProps, LinkTextProps } from '../../../types/ui';
import { LinkMode } from '../../../types/ui';
import { Button } from '../buttons/Button';
import { mergeAnchorRel } from '../../../handlers/linkHandlers';
import { StyledTextLink } from './Link.style';

/**
 * Унифицированная ссылка: текстовый `<a>` или «кнопка-ссылка» через `Button` с `href` (те же `variant`, `size`, иконки).
 *
 * Пропсы зависят от `mode`: для `text` — см. `LinkTextProps`, для `button` — `LinkButtonProps` (`types/ui`).
 */
export const Link = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>((props, ref) => {
  const { href, children, className, target, rel, download } = props;
  const safeRel = mergeAnchorRel(target, rel);

  if (props.mode === LinkMode.BUTTON) {
    const {
      mode: _mode,
      href: _h,
      target: _t,
      rel: _r,
      download: _d,
      className: _c,
      ...buttonProps
    } = props as LinkButtonProps;
    return (
      <Button
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={safeRel}
        download={download}
        className={clsx('ui-link', 'ui-link--button', className)}
        {...buttonProps}
      >
        {children}
      </Button>
    );
  }

  const {
    mode: _mode,
    textVariant = 'default',
    href: _h,
    target: _t,
    rel: _r,
    download: _d,
    className: _c,
    children: _ch,
    ...anchorRest
  } = props as LinkTextProps;

  return (
    <StyledTextLink
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={safeRel}
      download={download}
      className={clsx('ui-link', 'ui-link--text', className)}
      $variant={textVariant}
      {...anchorRest}
    >
      {children}
    </StyledTextLink>
  );
});

Link.displayName = 'Link';
