
import { useState, useEffect } from "react"

export default function TaskModal({ open, card, onClose, onSave }) {
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (card) setTitle(card.title || "")
  }, [card])
  if (!open) return null;

  const handleSave = () => {
    if (!title.trim()) return
    onSave({ ...card, title })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Task Title" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100" >
            Cancel </button>
          <button onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700" >Save </button>
        </div>
      </div>
    </div>
  )
}
// import { useState, useEffect } from "react";

// export default function TaskModal({ open, onClose, onSave, card, mode = "task", minimal = false }) {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     priority: "Medium",
//     tags: "",
//   });

//   useEffect(() => {
//     if (card) {
//       setForm({
//         title: card.title || "",
//         description: card.description || "",
//         dueDate: card.dueDate || "",
//         priority: card.priority || "Medium",
//         tags: card.tags?.join(", ") || "",
//       });
//     }
//   }, [card]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-4 w-80 rounded shadow">
//         {/* Always show title */}
//         <input
//           className="w-full mb-2 p-1 border rounded"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         {/* Only show other fields if minimal=false */}
//         {!minimal && mode === "task" && (
//           <>
//             <textarea
//               className="w-full mb-2 p-1 border rounded"
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />
//             <input
//               type="date"
//               className="w-full mb-2 p-1 border rounded"
//               value={form.dueDate}
//               onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
//             />
//             <select
//               className="w-full mb-2 p-1 border rounded"
//               value={form.priority}
//               onChange={(e) => setForm({ ...form, priority: e.target.value })}
//             >
//               <option>High</option>
//               <option>Medium</option>
//               <option>Low</option>
//             </select>
//             <input
//               className="w-full mb-3 p-1 border rounded"
//               placeholder="Tags"
//               value={form.tags}
//               onChange={(e) => setForm({ ...form, tags: e.target.value })}
//             />
//           </>
//         )}

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="text-sm bg-slate-200 p-2">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (!form.title.trim()) return;
//               onSave({
//                 ...form,
//                 tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
//               });
//               onClose();
//             }}
//             className="bg-green-500 dark:bg-blue-900 text-white px-3 py-1 rounded text-sm"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

