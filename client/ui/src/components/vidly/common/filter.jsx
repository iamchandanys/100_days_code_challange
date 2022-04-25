import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  const { filterList, textProperty, valueProperty, selectedFilter, onFilterChange } = props;

  return (
    <ul className="list-group">
      {filterList.map((item) => (
        <li className={item[valueProperty] === selectedFilter[valueProperty] ? "list-group-item active" : "list-group-item"} key={item[valueProperty]} onClick={() => onFilterChange(item)}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.propTypes = {
  filterList: PropTypes.array.isRequired,
  selectedFilter: PropTypes.any.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Filter;
