import { useState, useContext, createContext, Children, useEffect } from "react"
import {v4 as uuidv4} from "uuid"

const BoardContext = createContext()
export const useBoard = ()=> useContext(BoardContext)
export  const  BoardProvider = ({children} ) => {
    const [boards, setBoards] = useState(() => {
  const saved = localStorage.getItem("boards")
  return saved ? JSON.parse(saved) : []
});

    useEffect(()=>{
      localStorage.setItem("boards", JSON.stringify(boards))
    }, [boards])

 const exportBoards =() => {
      const data = JSON.stringify(boards, null, 2)
      const blob = new Blob([data], {type: "application/json"})
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "boards.json"
      a.click()
      URL.revokeObjectURL(url)
    };
    const importBoards = (file) => {
      const reader = new FileReader()

   reader.onload = (e) =>{
        try {
          const json = JSON.parse(e.target.result)
          setBoards(json)
        }catch {
          console.error("Invalids JSON file")
        }
      }
 reader.readAsText(file)
    }
   const createBoard = (name) => {
  setBoards(prev => [
    ...prev, { id: uuidv4(),
      name,
      columns: [
        { id: uuidv4(), name: "To Do", cards: [] },
        { id: uuidv4(), name: "In progress", cards: [] },
        { id: uuidv4(), name: "Done", cards: [] }
      ] } ])
}
    const renameBoard = (id, newName) => {
        setBoards(boards.map(b => b.id === id ? {...b , name: newName}: b))}
   const deleteBoard = (id) => {
  setBoards(prev => prev.filter(b => b.id !== id))
}
   const createCard = (boardId, columnId, title, description = "", dueDate = "", priority = "Medium", tags = []) => {
    const newCard = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    priority, tags,
    createdAt: new Date().toISOString(), 
    completedAt: null
     }

setBoards(prev =>
        prev.map(b =>
        b.id === boardId
        ? {
            ...b,
            columns: b.columns.map(c => c.id === columnId ? { ...c, cards: [...(c.cards ?? []), newCard] }: c ),
          }: b));} 
    const renameCard = (boardId, columnId, cardId, newTitle, newDescription, newDueDate, newPriority,newTags) => {
      setBoards(prev =>
          prev.map(b => b.id === boardId ? {...b,columns: b.columns.map(c => c.id === columnId ? {...c,cards: (c.cards ?? []).map(card => card.id === cardId ? { ...card, title: newTitle, description: newDescription, dueDate: newDueDate, priority: newPriority, tags: newTags, } : card )}: c)}: b));};
          const deleteCard = (boardId, columnId, cardId) => {
      setBoards(prev =>prev.map(b => b.id === boardId ? { ...b, columns: b.columns.map(c => c.id === columnId ? {...c, cards: (c.cards ?? []).filter(card => card.id !== cardId)}: c) }: b));};
    
      return(
        <BoardContext.Provider value={{
            boards,setBoards, createBoard, renameBoard, deleteBoard,  createCard, deleteCard, renameCard,exportBoards, importBoards
        }}>
            {children}
        </BoardContext.Provider>)}
             
   