import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter,  useDroppable,} from "@dnd-kit/core"
import {SortableContext, verticalListSortingStrategy, arrayMove,useSortable,} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
function TaskCard({ task, column }) {
  const {setNodeRef,attributes, listeners, transform,transition,} = useSortable({ id: String(task.id),  data: { column } })

  return (
    <div
    ref={setNodeRef} {...attributes}  {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition, }}
      className="p-2 mb-2 bg-white border rounded cursor-grab" > {task.title} </div>
  )
}

function Column({ id, title, children }) {
  const { setNodeRef } = useDroppable({
    id,
    data: { column: id },})

  return (
    <div
      ref={setNodeRef}
      className="w-1/3 bg-gray-100  p-4 rounded-lg shadow min-h-[200px]">
    <h2 className="font-bold mb-3">{title}</h2>
      {children}
    </div>
  )
}

export default function UserDashboard() {
  const { userId } = useParams();
  const loadedRef = useRef(false);

  const [columns, setColumns] = useState({
    todo: [], inProgress: [], completed: [],
  });

  useEffect(() => {
    loadedRef.current = false
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const userTasks = allTasks.filter(
      (t) => String(t.assignedTo) === String(userId)
    )
    const grouped = {
      todo: [], inProgress: [],completed: [],
    }

    userTasks.forEach((t) => {
      if (grouped[t.status]) grouped[t.status].push(t);
    })
    setColumns(grouped);

    setTimeout(() => {
      loadedRef.current = true; }, 0)
  }, [userId])

  useEffect(() => {
    if (!loadedRef.current) return
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const otherTasks = allTasks.filter((t ) => String(t.assignedTo) !== String(userId))

    localStorage.setItem(
      "tasks",
      JSON.stringify([ ...otherTasks, ...columns.todo, ...columns.inProgress, ...columns.completed, ])
    )}, [columns, userId])

  const sensors = useSensors(useSensor(PointerSensor))
  const handleDragEnd = ({ active, over }) => {
    if (!over) return

    const from = active.data.current.column
    const to = over.data.current?.column || over.id

    if (!columns[to]) return

    if (from === to) {
      const oldIndex = columns[from].findIndex((t) => t.id === active.id)
      const newIndex = columns[to].findIndex((t) => t.id === over.id)
      setColumns({  ...columns,
        [from]: arrayMove(columns[from], oldIndex, newIndex),
      })
 } 
      else {
      const task = columns[from].find((t) => t.id === active.id)
      setColumns({
        ...columns,
        [from]: columns[from].filter((t) => t.id !== active.id),
        [to]: [...columns[to], { ...task, status: to }],
      })
    }
  }
  const titles = {
    todo: "To Do",inProgress: "In Progress", completed: "Completed" }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd} >
      <div className="flex gap-6 p-6">
        {Object.keys(columns).map((col) => (
          <Column key={col} id={col} title={titles[col]}>
            <SortableContext
              items={columns[col].map((t) => String(t.id))}
              strategy={verticalListSortingStrategy} >
              {columns[col].map((task) => (
                <TaskCard key={task.id} task={task} column={col} />
              ))}
            </SortableContext>
          </Column>
        ))}
      </div>
    </DndContext>
  )
}
