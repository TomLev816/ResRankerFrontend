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
  background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: 250
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
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rankedRestaurants: state.rankedRestaurants,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop)
