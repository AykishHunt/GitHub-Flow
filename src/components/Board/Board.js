import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useBoard } from "../../Context/BoardContext"
import Column from "./Column"
import { useState } from "react"

const Board = ({ boardId }) => {
  const { boards, setBoards } = useBoard()
   const [sortType, setSortType] = useState("")
  const [filteringTag, setFilteringTag] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const processCards = (cards) => {
    let result = [...cards];
    if (searchTerm.trim() !== "") {
      const t = searchTerm.toLowerCase()
      result = result.filter(
        (c) => c.title.toLowerCase().includes(t) || c.description?.toLowerCase().includes(t)
      );
    }
    if (filteringTag.trim() !== "") {
      const tag = filteringTag.trim().toLowerCase()
      result = result.filter((c) => c.tags.some((t) => t.toLowerCase() === tag))
    }
    if (sortType === "dueDate") {
      result.sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
    }
    if (sortType === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 }
      result.sort((a, b) => order[a.priority] - order[b.priority])
    }
    if (sortType === "createdAt") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    return result
  }

  const sensors = useSensors(useSensor(PointerSensor))
  const board = boards.find((b) => b.id === boardId)
  if (!board) return <p className="text-center text-gray-500 dark:text-gray-300 mt-10">No board selected</p>
const handleDragEnd = ({ active, over }) => {
  if (!over || active.id === over.id) return
  const board = boards.find((b) => b.id === boardId)
  if (!board) return
  let sourceColumn, card
  for (let col of board.columns) {
    const found = col.cards.find((c) => c.id === active.id)
    if (found) {
      sourceColumn = col
      card = found
      break}}
  if (!card || !sourceColumn) return
  let targetColumnId = over?.id

  let targetColumn = board.columns.find((col) =>
    col.cards.some((c) => c.id === targetColumnId)
  );
  if (!targetColumn) {
    targetColumn = board.columns.find((col) => col.id === targetColumnId)}

  if (!targetColumn) targetColumn = sourceColumn
  const newColumns = board.columns.map((col) => {
    if (col.id === sourceColumn.id) {
      return { ...col, cards: col.cards.filter((c) => c.id !== card.id) }
    }
    return col
  })
  const targetColIndex = newColumns.findIndex((c) => c.id === targetColumn.id)
  const targetCol = newColumns[targetColIndex]

  const updatedCard = { ...card }
  if (targetCol.name === "Done" && !card.completedAt)
    updatedCard.completedAt = new Date().toISOString()
  if (targetCol.name !== "Done") updatedCard.completedAt = null

  const newTargetCards = [...targetCol.cards]
  newTargetCards.push(updatedCard)
  newColumns[targetColIndex] = { ...targetCol, cards: newTargetCards }
  setBoards((prev) =>
    prev.map((b) => (b.id === boardId ? { ...b, columns: newColumns } : b)))
}
  return (
    <>
     
      <div className="flex flex-col sm:flex-row gap-2 justify-end sm:gap-3 p-4 bg-white dark:bg-gray-950 shadow rounded mb-4 items-start sm:items-center">
        <input
          type="text" placeholder="Search tasks..." className="border border-green-300 dark:border-gray-700 p-2 rounded focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white text-sm w-full sm:w-auto"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="text" placeholder="Filter by tag" className="border border-green-300 dark:border-gray-700 p-2 rounded focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white text-sm w-full sm:w-auto"
          value={filteringTag} onChange={(e) => setFilteringTag(e.target.value)} />
      <select
         className="border  border-green-300 dark:border-gray-700 p-2 rounded text-gray-400 dark:bg-gray-800 dark:text-gray-400 focus:ring-2 focus:ring-green-400 text-sm w-full sm:w-auto"
          onChange={(e) => setSortType(e.target.value)} value={sortType} >
          <option value="">Sort</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Creation Time</option> </select> </div>


      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-nowrap lg:flex-wrap lg:justify-center gap-4 overflow-x-auto lg:overflow-visible p-2">
          {board.columns.map((column) => (
            <Column
              key={column.id} boardId={boardId} column={column}
              filteredCards={processCards(column.cards)}  className="flex-1 min-w-[250px] max-w-sm"/>))}
        </div>
      </DndContext>
    </> )
}

export default Board
