const defaultNewVisitForm = {date: "", comment: "", mealEaten: ""} ;

const newVisitForm = (state = defaultNewVisitForm, action) => {
  switch (action.type) {
  case "CHANGE_VISIT_FORM":
    return action.payload;
  default:
    return state;
  }
};

export default newVisitForm;
// [passed]: value
