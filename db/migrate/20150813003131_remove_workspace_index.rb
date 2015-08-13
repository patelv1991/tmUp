class RemoveWorkspaceIndex < ActiveRecord::Migration
  def change
    remove_index :workspaces, column: :title
    add_index :workspaces, :title
  end
end
