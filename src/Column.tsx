import { AddNewItem } from './AddNewItem'
import { ColumnContainer, ColumnTitle } from './styles'
import { useAppState } from './state/AppStateContext'
import { Card } from './Card'
import { addTask } from './state/actions'

type ColumnProps = {
  text: string
  id: string
}
export const Column = ({text, id } : ColumnProps) => {
  const {getTasksByListId, dispatch} = useAppState()
  const tasks = getTasksByListId(id)
  
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map(task => (<Card text={task.text} id={task.id} key={task.id}/>))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text,id))}
        dark
      />
    </ColumnContainer>
  )
}
