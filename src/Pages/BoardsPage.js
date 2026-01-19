import { useBoard } from "../Context/BoardContext"
import { useState } from "react"
import TaskModal from "../components/Task/TaskModel"
import { Link } from "react-router"

export default function BoardsPage() {
  const { boards, createBoard, renameBoard, deleteBoard } = useBoard()
  const [modalOpen, setModalOpen] = useState(false)
  const [editBoard, setEditBoard] = useState(null)

  return (
    <div className="p-6 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Boards</h1>
        <button
          onClick={() => { setEditBoard(null); setModalOpen(true); }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200"
        >+ Create Board </button>
      </div>

      <div className="space-y-4">
        {boards.map((b) => (
          <div
            key={b.id}
            className="bg-white dark:bg-gray-800 shadow rounded p-4 flex justify-between items-center hover:shadow-md transition-shadow duration-200"
          >
            <Link
              to={`/boards/${b.id}`}
              className="text-gray-800 dark:text-gray-100 font-semibold hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            >{b.name} </Link>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditBoard(b); setModalOpen(true); }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors duration-200"
              > Rename </button>
              <button
                onClick={() => deleteBoard(b.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200"
              > Delete</button>
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        open={modalOpen}
        mode="board" card={editBoard}
        onClose={() => setModalOpen(false)} onSave={(data) => {
          if (editBoard) renameBoard(editBoard.id, data.name)
          else createBoard(data.name)
        }}  /></div>
  )
}
