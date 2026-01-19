
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ tasks }) => {
  
  const statusCounts = { "To Do": 0, "In Progress": 0, "Done": 0 }

  tasks.forEach(task => {
 
    if (task.completedAt) {
      statusCounts.Done++
    } else if (task.columnName === "In progress") {
      statusCounts["In Progress"]++
    } else if (task.columnName === "To Do") {
      statusCounts["To Do"]++
    } else {
      
    statusCounts["To Do"]++
    }
  })
  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "# of Tasks",
        data: Object.values(statusCounts),
        backgroundColor: ["#FF0000", "#FFA500", "#006400"],
      },
    ],
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
     
      <h2 className="text-lg font-semibold mb-2 dark:text-white">Task Status
      </h2>
      <Pie data={data} />
    </div>
  )
}
export default PieChart