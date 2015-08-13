class RemoveTaskIndex < ActiveRecord::Migration
  def change
    remove_index :tasks, name: "my_task_assignment"
  end
end
