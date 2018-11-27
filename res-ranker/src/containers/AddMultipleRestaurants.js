import React, { Component } from 'react';
import {connect} from 'react-redux'
import SearchMultiRestaurants from '../components/SearchMultiRestaurants'
// import HalfPageRankRestaurants from '../components/HalfPageRankRestaurants'
import { rankedRestaurantsAction, userLoggedInAction } from '../store/actions/'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Redirect} from 'react-router-dom'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

//  Moves an item from one list to another list.

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the allRestaurants look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `0 0 ${8}px 0`,
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: 250
})


class AddMultipleRestaurants extends Component {



  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reRankedRestaurants = reorder(
      this.props.rankedRestaurants,
      result.source.index,
      result.destination.index
    );
    this.props.newRankedRestaurantFunction(reRankedRestaurants)
  }

  handleSubmit = () => {
    if (this.props.rankedRestaurants.length > 4) {
      this.props.rankedRestaurants.map((restaurant, index) => {
        return fetch('http://localhost:4000/api/v1/user_restaurant_rankings', {
          method: 'POST',
          body: JSON.stringify({
            "restaurant_id": restaurant.id,
            "user_id": this.props.userLoggedIn.id,
            "ranking": index + 1,
            "visits": [],
          }),
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(resJson =>  console.log(resJson))
      })
    } else {
      console.log('nonon')
    }
  }


  rankedRestaurants  = this.props.rankedRestaurants
  render() {
    console.log(this.props.rankedRestaurants);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='add-multiple-restaurants-page'>
          <div className='add-multi-res-header'>
            <center>
              <h1>Welcome</h1>
              <h3>Add 5 restaurants that you've been to and rank them</h3>
            </center>
          </div>
          <div className='add-multi-res-container'>
            <div className='add-multi-box'>
              <center>Search for restaurants you've been to</center>
              <SearchMultiRestaurants />
          </div>
            <div className='add-multi-box'>
              <center>
                Rank the restaurants
                <br></br>
                <button onClick={this.handleSubmit}>Submit Your List</button>
              </center>

              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    <center>Restaurants you've been to</center>
                    {this.props.rankedRestaurants ?
                      this.props.rankedRestaurants.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                            style={getItemStyle( snapshot.isDragging, provided.draggableProps.style
                          )}>
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    )) : null }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>



            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    allRestaurants: state.allRestaurants,
    rankedRestaurants: state.rankedRestaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants)),
    userLoggedInFunction: user => dispatch(userLoggedInAction(user)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMultipleRestaurants)
