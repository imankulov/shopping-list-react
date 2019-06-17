import React, { Component } from 'react';
import './App.css';
import { Container, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';
import _ from 'lodash';
import axios from 'axios';


let BASE_URL;
if (process.env.NODE_ENV !== 'production') {
  BASE_URL = "http://127.0.0.1:3001/api/items";
} else {
  BASE_URL = "/api/items";
}

const ItemsList = ({ items, onCheck, onDelete }) =>
  <List>
    {
      items.map(({ _id, name, checked }) =>
        <ListItem divider={true} key={_id}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked}
              tabIndex={-1}
              onChange={() => onCheck(_id)}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText onClick={() => onCheck(_id)}>{name}</ListItemText>
          <ListItemSecondaryAction onClick={() => onDelete(_id)}>
            <IconButton edge="end" aria-label="Comments">
              <DeleteForever />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
  </List>

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], newItemName: "" };
    this.fetchItemsList = this.fetchItemsList.bind(this);
    this.setItemsList = this.setItemsList.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onNewItemEnter = this.onNewItemEnter.bind(this);
    this.onNewItemChange = this.onNewItemChange.bind(this);
  }

  componentDidMount = () => {
    this.fetchItemsList();
  }

  render = (props) =>
    <Container maxWidth="sm">
      <ItemsList items={this.state.items} onCheck={this.onCheck} onDelete={this.onDelete} />
      <TextField fullWidth placeholder="New Item"
        value={this.state.newItemName}
        onKeyUp={this.onNewItemEnter}
        onChange={this.onNewItemChange} />
    </Container>;

  fetchItemsList = () => {
    axios(BASE_URL).then(result => this.setItemsList(result.data));
  }

  setItemsList = (data) => {
    this.setState({ "items": data._items })
  }

  onCheck = (itemID) => {
    const items = this.state.items.map(item => {
      const changedItem = { ...item };
      if (changedItem._id === itemID) {
        changedItem.checked = !changedItem.checked;
        axios.patch(`${BASE_URL}/${itemID}`, { checked: changedItem.checked });
      }
      return changedItem;
    })
    this.setState({ 'items': items })
  }

  onDelete = (itemID) => {
    const items = this.state.items;
    _.remove(items, item => item._id === itemID)
    axios.delete(`${BASE_URL}/${itemID}`);
    this.setState({ 'items': items })
  }

  onNewItemChange = (event) => {
    this.setState({ newItemName: event.target.value });
  }

  onNewItemEnter = (event) => {
    if (event.keyCode === 13) {
      const name = this.state.newItemName;
      axios.post(BASE_URL, {
        name: name,
      }).then(result => {
        const newItem = { _id: result.data._id, name: name, checked: false };
        const items = [...this.state.items, newItem];
        this.setState({ newItemName: "", items: items });
      });
    }
  }
}
export default App;
