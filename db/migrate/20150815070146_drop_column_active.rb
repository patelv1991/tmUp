class DropColumnActive < ActiveRecord::Migration
  def change
    remove_column :workspaces, :active
  end
end
