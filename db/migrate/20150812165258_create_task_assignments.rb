class CreateTaskAssignments < ActiveRecord::Migration
  def change
    create_table :task_assignments do |t|
      t.integer :task_id, null: false
      t.integer :assignee_id
      t.integer :assignor_id

      t.timestamps null: false
    end

    add_index :task_assignments, [:task_id, :assignor_id, \
              :assignee_id], unique: true, name: "my_task_assignment"
  end
end
