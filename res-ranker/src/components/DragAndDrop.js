import React, { Component } from 'react';
import { rankedRestaurantsAction } from '../store/actions/'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {connect} from 'react-redux'


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the allRestaurants look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `0 0 ${8}px 0`,
  // change background colour if dragging
  background: isDragging ? 'lightgrey' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'darkgrey' : 'lightgrey',
  padding: 8,
  width: 400
})


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}



class DragAndDrop extends Component {

  onDragEnd = (result) => {
    // dropped outside the list
    console.log(result);

    if (!result.destination) {
      return;
    }
    const reRankedRestaurants = reorder(
      this.props.rankedRestaurants,
      result.source.index,
      result.destination.index
    );
    console.log(this.props);
    this.props.newRankedRestaurantFunction(reRankedRestaurants)
  }

  render() {
    //console.log("Rendering DragAndDrop, RankedRestaurants are", this.props.rankedRestaurants);
    //debugger
    return (
      <center>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {this.props.rankedRestaurants ?
                this.props.rankedRestaurants.map((item, index) => {
                  let restaurant = this.props.allRestaurants.find(rest => rest.id === item.restaurant_id)
                  return (
                    <Draggable key={restaurant.id} draggableId={restaurant.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          style={getItemStyle( snapshot.isDragging, provided.draggableProps.style
                        )}>
                          <div className='drag-info'>
                          <h2>{`${index+1}. ${restaurant.name}`}</h2>
                          <img src={restaurant.image_src} alt=''></img>
                          </div>
                        </div>
                      )}
                    </Draggable>
                )
              }) : null }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </center>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rankedRestaurants: state.rankedRestaurants,
    allRestaurants: state.allRestaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop)
