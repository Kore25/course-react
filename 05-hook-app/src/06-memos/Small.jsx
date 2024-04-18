import { memo } from 'react';

export const Small = memo(({ counter }) => {

    console.log(' Me volvi a generar :(');
  return (
    <small>{ counter }</small>
  )
})
