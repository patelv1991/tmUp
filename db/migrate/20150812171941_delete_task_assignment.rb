class DeleteTaskAssignment < ActiveRecord::Migration
  def change
    drop_table :task_assignments
  end
end
