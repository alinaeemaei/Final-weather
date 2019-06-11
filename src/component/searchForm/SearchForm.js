import React from "react";
import "./SearchForm.css";

const SearchForm = props => {
  return (
    <div className="autoComplete">
      <form autoComplete="off" onSubmit={props.getWeatherInfo}>
        <input
          value={props.state.text}
          onChange={props.onChangeHandler}
          type="text"
          placeholder={props.state.placeholder}
        />
        <input className="inputSubmit" type="submit" />
      </form>
      <ul onClick={props.SearchListHandle}>
        {props.state.searchValu.slice(0, 4).map((item, index) => (
          <li key={index} data-itemid={item.name}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchForm;
