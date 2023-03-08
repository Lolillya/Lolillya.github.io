import React from "react";

export default function Die(props) {
    const styles = { 
        backgroundColor: props.isHeld ? "#59e391" : "#ffffff"
    }

    return (
        <div className={`dice`} style={styles} onClick={props.holdDice}>
            <h3>{props.value}</h3>
        </div>
    )
}