import { useLayoutEffect, useRef, useState } from "react"

export const PokemonCard = ({ id, name, sprites = []}) => {
    const tituloRef = useRef();
    const [boxSize, setBoxSize] = useState({ width: 0, height: 0});
    useLayoutEffect(() => {
      const { height, width } = tituloRef.current.getBoundingClientRect();
      setBoxSize({
        height,
        width,
      });
    }, [name])

    return (
        <>
            <section style={{ display: 'flex' }}>
                <h2 ref={tituloRef} className="text-capitalize">#{id} - {name} </h2>

                <div>
                    {
                        sprites.map( sprite => (
                            <img key={sprite} src={sprite} alt={name} />
                        ))
                    }
                </div>
            </section>
            <code>{ JSON.stringify(boxSize) }</code>
        </>
    )
}
