class UpdateTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :assignee_id, :integer
    add_column :tasks, :assignor_id, :integer

    add_index :tasks, [:id, :assignor_id, \
              :assignee_id], unique: true, name: "my_task_assignment"
  end
end
