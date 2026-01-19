
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const BarChart = ({ tasks }) => {
  const priorityCounts = { High: 0, Medium: 0, Low: 0 }
  tasks.forEach(task => {
    priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1
  })
  const data = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: "# of Tasks",
        data: Object.values(priorityCounts),
        backgroundColor: ["#ef4444", "#facc15", "#10b981"],
      },
    ],
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">

      <h2 className="text-lg font-semibold mb-2 dark:text-white">Tasks by Priority</h2>

      <Bar data={data} />
    </div>
  )
}

export default BarChart