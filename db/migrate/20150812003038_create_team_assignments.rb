class CreateTeamAssignments < ActiveRecord::Migration
  def change
    create_table :team_assignments do |t|
      t.integer :project_id, null: false
      t.integer :member_id, null: false
      t.timestamps null: false
    end

    add_index :team_assignments, [:project_id, :member_id], unique: true
  end
end
