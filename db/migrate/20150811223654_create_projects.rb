class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.string :description
      t.integer :workspace_id, null: false
      t.integer :owner_id
      t.date :due_date
      t.timestamps null: false
    end

    add_index :projects, [:title, :workspace_id], unique: true
    add_index :projects, :owner_id
  end
end
