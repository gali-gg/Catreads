import { ADD_BOOK_TO_SHELF, ADD_SHELF, DELETE_SHELF, REMOVE_BOOK_FROM_SHELF } from '../actions/shelfAction';

const INITIAL_STATE = {
    "Want to Read": [],
    "Currently Reading":[],
    "Read": [],
};

export const shelfReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case ADD_SHELF:
            return {
                ...state, 
                [action.payload.name] : []
            };
            
        case ADD_BOOK_TO_SHELF:
            let shelf = action.payload.name;
            let newShelfBooks = state[shelf].some( book => book.uuid === action.payload.uuid) 
                ? 
                   state[shelf]
                :
                    [...state[shelf], action.payload.book]
            return{
                ...state,
                [shelf]: newShelfBooks
            };
        
        case REMOVE_BOOK_FROM_SHELF:
            return{
                ...state,
                [action.payload.name]: state[action.payload.name].filter( book => book.uuid !== action.payload.uuid)
                
            };
        case DELETE_SHELF:
            let deletedShelfName = action.payload.name;
        
            if( deletedShelfName !== "Want to Read" && 
                deletedShelfName !== "Currently Reading" && 
                deletedShelfName !== "Read"){
                    delete state[action.payload.name];
                }

            return {
                ...state
            };
        default: return state;
    }
};