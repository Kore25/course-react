import { useState } from "react";
import { AddCategory, GifGrid } from "./components";

export const GifExpertApp = () => {
    const [categories, setCategories ] = useState([ ]);
    const onAddCategory = ( newCategory ) => {
        if (categories.includes(newCategory)) return;
        setCategories([newCategory, ...categories ]);
    }
    return (
        <>
            <h1>GIFS</h1>
            <AddCategory onNewCategory={onAddCategory} />
            {categories.length === 0 && ( <p>Escribe arriba lo que quieras buscar.</p>)}
            {
                categories.map( category => (
                    <GifGrid key={category} category={category} />
                ))
            }
        </>
    );
}
