import React, {useRef} from 'react'

type LazyLoadWrapper = {
    children: React.ReactNode | React.ReactElement;
}

const LazyLoadWrapper = ({children}: LazyLoadWrapper) => {

    const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
        {children}
    </div>
  )
}

export default LazyLoadWrapper