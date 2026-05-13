import { interpolateHrefTemplate } from './interpolateHrefTemplate';

describe('interpolateHrefTemplate', () => {
  it('подставляет плейсхолдеры из строки', () => {
    const row = { id: '42', slug: 'hello-world' };
    expect(interpolateHrefTemplate('/users/{id}/posts/{slug}', row)).toBe(
      '/users/42/posts/hello-world',
    );
  });

  it('возвращает строку без изменений без плейсхолдеров', () => {
    expect(interpolateHrefTemplate('/static', { id: '1' })).toBe('/static');
  });
});
