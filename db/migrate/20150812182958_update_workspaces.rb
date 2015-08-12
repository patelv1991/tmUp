class UpdateWorkspaces < ActiveRecord::Migration
  def change
    change_column :workspaces, :title, :string, null: false
  end
end
