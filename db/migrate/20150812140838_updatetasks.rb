class Updatetasks < ActiveRecord::Migration
  def change
    add_column :tasks, :creator_id, :integer, null: false
    add_index :tasks, :creator_id
  end
end
