import { useState, useEffect } from "react"
import TaskModal from "../components/Task/TaskModel"
import { users } from "../Data/Data"

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState("")
   const [selectedUser, setSelectedUser] = useState(users[0].id)
  const [editingTask, setEditingTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(stored)
  }, [])

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

   const handleAssign = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: taskInput,
      assignedTo: String(selectedUser),
      status: "todo",
    };
    saveTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  const handleSave = (updatedTask) => {
    saveTasks( tasks.map((t) =>
        t.id === updatedTask.id ? { ...t, title: updatedTask.title } : t ) )
    setIsModalOpen(false)}
  const handleDelete = (taskId) => {
    saveTasks(tasks.filter((t) => t.id !== taskId))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8"> <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1></div>
      <div className="flex gap-3 mb-8">
        <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Enter task title..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />

        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" >
          {users.map((u) => ( <option key={u.id} value={u.id}>{u.username}</option> ))}  </select>

        <button onClick={handleAssign}className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow font-medium">Assign</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => { const userTasks = tasks.filter((t) => String(t.assignedTo) === String(user.id));
           return (
            <div key={user.id} className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition" >
              < h2 className="text-xl font-semibold mb-3">{user.username}</h2 >
              {userTasks.length === 0 ? (
                  < p  className="text-gray-400 italic">No tasks assigned</p> ) : (
               <div className="space-y-3">
                  {userTasks.map((task) => (
                    <div key={task.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
                      <span className="text-gray-700 font-medium">{task.title}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(task)} className="text-blue-600 hover:underline text-sm font-medium" >
                          Edit</button>
                      <button onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:underline text-sm font-medium" >
                          Delete </button>
                      </div>
                   </div> 
                   ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {isModalOpen && (
        <TaskModal open card={editingTask}  onClose={() => setIsModalOpen(false)} onSave={handleSave} /> )}
    </div>
  )
}
