class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :parent_task_id, index: true
      t.date :due_date, index: true
      t.integer :project_id, index: true
      t.string :title, null: false, index: true
      t.text :body

      t.timestamps null: false
    end


  end
end
