<template>
  <div class="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
    <div class="kanban-board max-w-screen-xl mx-auto px-8 py-16">
      <div class="columns flex gap-8">
        <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
          <div class="flex items-center justify-between mb-6">
            <h2 class="column-title text-lg font-semibold">{{ column.name }} ({{ column.tasks.length }})</h2>
            <button @click="removeColumn(columnIndex)" class="remove-column-button text-red-600 focus:outline-none">
              <i class="bx bx-trash-alt"></i>
            </button>
          </div>
          <draggable v-model="columns[columnIndex].tasks"
                     :group="{ name: 'tasks', put: true }"
                     :item-key="task => task.id" 
                     @change="saveData"
                     @start="dragStart"
                     @end="dragEnd"
                     @add="dragAdd">
            <template v-slot:item="{ element }">
              <div :key="element.id" class="task bg-white rounded-md shadow-md p-4 mb-4 flex justify-between items-center">
                <span class="task-name">{{ element.name }}</span>
                <span class="task-label" :class="getPriorityClass(element.priority)">{{ element.priority }}</span> <!-- Add task label with class -->
                <button @click="deleteTask(columnIndex, element.id)" class="delete-button">
                  <i class='bx bx-trash'></i>
                </button>
              </div>
            </template>
          </draggable>
          <input v-model="newTaskNames[columnIndex]" type="text" :placeholder="'+ New '"
                 class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                 @keyup.enter="addTask(columnIndex)" />
          <select v-model="newTaskPriorities[columnIndex]" class="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300">
            <option value="" disabled selected>Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div class="flex items-center justify-center mt-8">
        <input v-model="newColumnName" type="text" placeholder="New Column Name"
               class="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300" />
        <button @click="addColumn" class="add-column-button ml-4 bg-indigo-600 text-white rounded-md shadow-md px-6 py-3 hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 transition-colors">Add Column</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      columns: [],
      newTaskNames: ['', '', ''],
      newTaskPriorities: ['', '', ''], // Array to store task priorities
      newColumnName: '',
      dragIndex: -1 // Initialize dragIndex to -1
    };
  },
  mounted() {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem('kanbanData');
    if (storedData) {
      this.columns = JSON.parse(storedData);
    } else {
      // Initialize columns if no data is stored
      this.columns = [
        { name: "To Do", tasks: [] },
        { name: "In Progress", tasks: [] },
        { name: "Done", tasks: [] }
      ];
    }
  },
  methods: {
    saveData() {
      // Save data to local storage
      localStorage.setItem('kanbanData', JSON.stringify(this.columns));
    },
    addTask(columnIndex) {
      if (this.newTaskNames[columnIndex].trim() !== "" && this.newTaskPriorities[columnIndex] !== "") {
        this.columns[columnIndex].tasks.push({
          id: Date.now(),
          name: this.newTaskNames[columnIndex].trim(),
          priority: this.newTaskPriorities[columnIndex] // Assign selected priority
        });
        this.newTaskNames[columnIndex] = "";
        this.newTaskPriorities[columnIndex] = ""; // Reset priority after adding task
        this.saveData();
      }
    },
    deleteTask(columnIndex, taskId) {
      this.columns[columnIndex].tasks = this.columns[columnIndex].tasks.filter(task => task.id !== taskId);
      this.saveData();
    },
    dragStart(event) {
      // Set dragIndex to the index of the column being dragged from
      this.dragIndex = event.oldIndex;
    },
    dragEnd() {
      // Reset dragIndex when dragging ends
      this.dragIndex = -1;
    },
    dragAdd(event) {
      // Set dragIndex to the index of the column being dragged to
      this.dragIndex = event.newIndex;
    },
    addColumn() {
      if (this.newColumnName.trim() !== "") {
        this.columns.push({ name: this.newColumnName.trim(), tasks: [] });
        this.newTaskNames.push('');
        this.newTaskPriorities.push('');
        this.newColumnName = ''; // Clear input field after adding column
        this.saveData();
      }
    },
    removeColumn(columnIndex) {
      if (confirm("Are you sure you want to remove this column?")) {
        this.columns.splice(columnIndex, 1);
        this.newTaskNames.splice(columnIndex, 1);
        this.newTaskPriorities.splice(columnIndex, 1); // Remove priority for the removed column
        this.saveData();
      }
    },
    getPriorityClass(priority) {
      // Return class based on priority
      switch (priority) {
        case 'High':
          return 'task-label-high';
        case 'Medium':
          return 'task-label-medium';
        case 'Low':
          return 'task-label-low';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.kanban-board {
  padding: 64px 0; /* Increased padding */
}

.columns {
  overflow-x: auto;
}

.column {
  background-color: #ffffff; /* Changed background color */
  border-radius: 12px; /* Increased border radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  min-width: 280px; /* Adjusted min-width */
  max-width: calc(100% / 3 - 16px); /* Adjusted max-width */
}

.column-title {
  font-size: 20px; /* Increased font size */
}

.task {
  background-color: #ffffff;
  border-radius: 8px; /* Adjusted border radius */
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.delete-button i {
  color: #d81b60;
}

.delete-button i:hover {
  color: #9b2c68;
}

.add-column-button {
  padding: 14px 28px; /* Adjusted padding */
  border-radius: 10px; /* Adjusted border radius */
}

.remove-column-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px; /* Added margin-top */
}

.task-label {
  padding: 6px 10px; /* Adjusted padding */
  border-radius: 6px; /* Added border radius */
  font-size: 12px; /* Adjusted font size */
  font-weight: bold; /* Added font weight */
}

.task-label-high {
  background-color: #f56565; /* Red color for high priority */
  color: white; /* White text color */
}

.task-label-medium {
  background-color: #f6e05e; /* Yellow color for medium priority */
  color: black; /* Black text color */
}

.task-label-low {
  background-color: #68d391; /* Green color for low priority */
  color: white; /* White text color */
}
</style>
