import React, { Component } from 'react';
import { DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component { 
  constructor(props) {
    super(props); // The state is just a list of key/value pair (like a hashmap)
    this.state = {
      search: ""
      , type: "All"
    }; 
  } 

  // Sets the state whenever the user types on the search bar 
  onSearch = (event) => { 
    this.setState({search: event.target.value.toLowerCase()}); 
  } 

  filterItem = (item) => { 
    // Checks if the current search term is contained in this item
    const isTypeMatch = this.state.type === 'All' || item.type === this.state.type;
    const isSearchMatch = item.name.toLowerCase().includes(this.state.search);
    return isTypeMatch && isSearchMatch;
    //return item.name.toLowerCase().search(this.state.search) !== -1;
  }

  handleDropdownSelect = (eventKey) => {
    this.setState({ type: eventKey });
  }

  render() { 
    return (
      <div className="filter-list">
        <h1>Produce Search</h1> 
        <DropdownButton id="typeDropdown" title={"Type"} onSelect={this.handleDropdownSelect}>
          <Dropdown.Item eventKey="All" > All </Dropdown.Item> <br />
          <Dropdown.Item eventKey="Fruit" > Fruit </Dropdown.Item> <br />
          <Dropdown.Item eventKey="Vegetable" > Vegetable </Dropdown.Item> <br />
        </DropdownButton> <br /> <br /> <br />
        
        <input id="search" type="text" placeholder="Search" onChange={this.onSearch} /> {
        /* we are taking the items property (which is the list of
        produce), filtering the content to match the search word, then
        passing the filtered produce into the List component. */} 
        <List items={this.props.items.filter(this.filterItem)} />
        
      </div> 
    ); 
  } 
}

 export default FilteredList;