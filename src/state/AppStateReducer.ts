import { Action } from "./actions";
import { nanoid } from "nanoid"
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";

export type Task = {
    id: string
    text: string
  }
  
export type List = {
    id: string
    text: string
    tasks: Task[]
  }
  
export type AppState = {
    lists: List[]
    draggedItem: DragItem | null
  }

export const appStateReducer = (state: AppState, action: Action) : AppState => {
    switch (action.type) {
        
        case "ADD_LIST": {
            return {
                ...state, 
                lists: [
                    ...state.lists,
                    {id: nanoid(), text: action.payload, tasks: []}
                ]

            }
           
        }
        case "ADD_TASK": {
            //find a list to add a task
            const index_of_the_list = findItemIndexById(state.lists, action.payload.listId)
            const updatedLists = [...state.lists]
            const updatedList = {...state.lists[index_of_the_list]}
            
            if (index_of_the_list !== -1) {
                updatedList.tasks = [
                    ...updatedList.tasks,
                    { id: nanoid(), text: action.payload.text }
                ]
                updatedLists[index_of_the_list] = updatedList
                
            }
            return  {
                ...state,
                lists: updatedLists
            } 
            
        }

        case "MOVE_LIST" : {
            const {dragged_id, hover_id} = action.payload
            const draggedIndex = findItemIndexById(state.lists, dragged_id)
            const hoverIndex = findItemIndexById(state.lists, hover_id)
            const updatedLists = moveItem([...state.lists], draggedIndex, hoverIndex);

            return {
                ...state,
                lists: updatedLists
            }
        }

        case "SET_DRAGGED_ITEM": { 
            return {
                ...state,
                "draggedItem": action.payload
            }
            
             
        }
        default: {
            return state
        }
    }
}