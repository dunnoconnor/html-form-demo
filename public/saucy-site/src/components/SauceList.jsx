import React from 'react';
import Sauce from './Sauce';

function SauceList(props) {
    
    console.log(props.sauces)

    return (
        <div>
            {props.sauces.map((sauce) => {
                return <Sauce key={sauce.id} sauce={sauce}/>
            }
            )}
        </div>
    );
}

export default SauceList;