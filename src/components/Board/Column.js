import { useBoard } from "../../Context/BoardContext"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import TaskModal from "../Task/TaskModel"
import { useState } from "react"

const priorityColors = { High: "bg-red-500", Medium: "bg-yellow-500", Low: "bg-green-500" }

const SortableCard = ({ card, editingCard, handleEditCard, handleDeleteCard }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })
  const style = { transform: transform ? CSS.Transform.toString(transform) : undefined, transition }

  return (
    <>
    <div className="flex justify-end gap-2">
      <button onClick={() => handleEditCard(card)} className="text-xs text-green-600 hover:underline">🖉</button>
        <button onClick={() => handleDeleteCard(card)} className="text-xs text-red-600 hover:underline">✕</button>
      </div>
    
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white dark:bg-gray-700 p-3 rounded shadow mb-3 hover:shadow-lg transition-all">
      
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold dark:text-white text-sm">{card.title}</h3>
        <span className={`text-white text-xs px-2 py-0.5 rounded-full ${priorityColors[card.priority] || "bg-gray-400"}`}>
          {card.priority} </span>
      </div>
      {card.description && <p className="text-xs text-gray-700 dark:text-gray-200 mb-1 overflow-y-auto max-h-24">{card.description}</p>}
      {card.dueDate && <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Due: {card.dueDate}</p>}
      {card.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {card.tags.map((tag, idx) => (
            <span key={idx} className="bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded">{tag}</span> ))}
        </div>
      )}
      
    </div></>
  )
}
const Column = ({ boardId, column, filteredCards }) => {
  const { createCard, renameCard, deleteCard } = useBoard()
  const safeCards = filteredCards || []
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const { setNodeRef } = useDroppable({ id: column.id })
  const handleAddCard = () => { 
    setEditingCard(null)
    setModalOpen(true)
  }
  const handleEditCard = (card) => { 
    setEditingCard(card)
    setModalOpen(true)
  }
  const handleSave = (data) => {
    if (editingCard) {
      renameCard(boardId, column.id, editingCard.id, data.title, data.description, data.dueDate, data.priority, data.tags) } else {
      createCard(boardId, column.id, data.title, data.description, data.dueDate, data.priority, data.tags) } }

      const handleDeleteCard = (card) => deleteCard(boardId, column.id, card.id)

  return (
    <div className="bg-green-50 dark:bg-gray-800/20 rounded p-3 w-full sm:w-64 md:w-72 lg:w-80 flex-shrink-0 flex flex-col">
      <h2 className="text-md font-semibold mb-3 dark:text-white text-center">{column.name}</h2>

      <SortableContext items={safeCards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="min-h-[100px] flex flex-col gap-2">
          {safeCards.length > 0 ? (
            safeCards.map(card => (
              <SortableCard
                key={card.id} card={card} editingCard={editingCard}
                handleEditCard={handleEditCard} handleDeleteCard={handleDeleteCard} /> ))
          ) : ( <div className="flex-1 flex items-center justify-center rounded text-gray-400 dark:text-gray-500 text-sm">
              No tasks </div>)}
          <TaskModal open={modalOpen} card={editingCard} onClose={() => setModalOpen(false)} onSave={handleSave} />
        </div>
      </SortableContext>

      <button
        onClick={handleAddCard} className="mt-3 w-full bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 text-white py-1.5 rounded transition-colors" >
        + Add Task
      </button>
    </div>
  )
}

export default Column
