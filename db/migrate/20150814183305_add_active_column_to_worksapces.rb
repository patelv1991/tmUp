class AddActiveColumnToWorksapces < ActiveRecord::Migration
  def change
    add_column :workspaces, :active, :boolean
  end
end
