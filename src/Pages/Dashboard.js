import { useBoard } from "../Context/BoardContext"
import PieChart from "../components/Charts/PieChart"
import BarChart from "../components/Charts/BarChart"
import TimeInsights from "../components/Charts/TimeInsights"

const Dashboard = () => {
  const { boards } = useBoard()

  const allTasks = boards?.flatMap(board =>
    board.columns?.flatMap(col =>
      col.cards?.map(card => ({ ...card, columnName: col.name, boardId: board.id })) || []
    ) || []
  )

  return (
    <div className="p-6 md:p-8 lg:p-10 w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center">
        Dashboard  </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-8 transition-colors duration-300 flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">
             Task Distribution</h2>
          <div className="flex justify-center items-center w-full">
            <PieChart tasks={allTasks} /> </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-8 transition-colors duration-300 flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">
            Tasks by Column </h2>
          <div className="flex justify-center items-center w-full">
            <BarChart tasks={allTasks} /> </div>
        </div>
      </div>
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 md:p-10 mt-8 transition-all duration-300 hover:shadow-3xl flex flex-col items-center transform hover:-translate-y-1">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center tracking-wide">
    Time Insights </h2>
     <div className="flex justify-center items-center w-full">
    <TimeInsights tasks={allTasks} /> </div> </div>
    </div>
  )
}

export default Dashboard