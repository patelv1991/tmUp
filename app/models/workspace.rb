# == Schema Information
#
# Table name: workspaces
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Workspace < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true

  has_many :user_workspaces
  has_many :users, through: :user_workspaces
end
