import React from "react";

export default function Answer(props) {
  const { item, isChecked, onChange, id,iscorect,test } = props;

 
  const styles = {
    backgroundColor: test ? (item.isheld ? "#D6DBF5" : "white")
     :(item.isheld &&item.value===iscorect ? '#94D7A2' 
     :item.isheld ? '#F8BCBC' 
     : item.value === iscorect ? '#94D7A2' :'#F5F7FB'   
    ),
    color: '#293264',
    border: !test ? (
     item.isheld && item.value === iscorect ? '3px solid yellow'
    :item.isheld || item.value === iscorect ? 'none'
    : '1px solid #4D5B9E')
     :(item.isheld ?'none' :'1px solid #4D5B9E' ),
    opacity : !test ? (item.value === iscorect ? 'none' :'0.3' ) :'none'
  };

  const handdleClick = (e)=> {
    onChange(e)
  }

  return (
    <li>
      <input
        className="input-none"
        type="radio"
        id={id}
        value={item.value}
        checked={isChecked}
        name="cautraloi"
        onChange={handdleClick}
        
      />
      <label  className="labelStyle" style={styles} htmlFor={id}>{item.value}</label>
    </li>
  );
}
