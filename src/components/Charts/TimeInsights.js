
const TimeInsights = ({ tasks }) => {
  const completedTasks = tasks.filter(t => t.completedAt);
  const totalTasks = tasks.length
  const completionRate = totalTasks ? Math.round((completedTasks.length / totalTasks) * 100) : 0

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-4 w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2 dark:text-white">Time Insights</h2>
      <p className="dark:text-white">Total Tasks: {totalTasks}</p>
      <p className="dark:text-white">Completed Tasks: {completedTasks.length}</p>
      <p className="dark:text-white">Completion Rate: {completionRate}%</p>
    </div>
  )
}

export default TimeInsights