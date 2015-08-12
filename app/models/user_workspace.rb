# == Schema Information
#
# Table name: user_workspaces
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  workspace_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class UserWorkspace < ActiveRecord::Base
  validates :user, :workspace, presence: true
  validates :user_id, uniqueness: { scope: :workspace_id }

  belongs_to :user
  belongs_to :workspace
end
