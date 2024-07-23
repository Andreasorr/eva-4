import React from "react";

function ItemNota(props) {
    return(
        <div className="col-3">
            <div className={props.importante ? "nota_importante" : "nota"}>
                <h4>{props.titulo}</h4>
                <p>{props.nota}</p>
            </div>
        </div>
    );
}

export default ItemNota;