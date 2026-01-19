import { DndContext,closestCenter, PointerSensor, useSensor,useSensors} from "@dnd-kit/core";
import { arrayMove,SortableContext, verticalListSortingStrategy,  sortableKeyboardCoordinates,useSortable,} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
const columns = ["todo", "inprogress", "completed"]
const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {transform: CSS.Transform.toString(transform), transition, padding: "8px", margin: "5px 0", backgroundColor: "#eee", borderRadius: "4px", }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.title} ({task.assignedTo})
    </div>
  )
}
const TaskBoard = ({ tasks, setTasks, adminView, userId }) => {
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const taskIndex = tasks.findIndex((t) => t.id === active.id)
    if (taskIndex === -1) return
    const newTasks = [...tasks]
    const task = newTasks[taskIndex]
    const column = over.id.split("-")[0]
    task.status = column
    setTasks(newTasks)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col);

          return (
      <div key={col} style={{ border: "1px solid black", padding: "10px", width: "200px" }}>
              <h4>{col.toUpperCase()}</h4>
          <SortableContext items={colTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} draggable={!adminView && task.assignedTo !== userId ? false : true}  />
                ))}
              </SortableContext>
            </div>
          )
        })}
      </div>
    </DndContext>
  )
}

export default TaskBoard
