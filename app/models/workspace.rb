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
  validates :title, presence: true

  has_many :user_workspaces, dependent: :destroy
  has_many :users, through: :user_workspaces
  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects

  def is_member?(u)
    return true if u.id == self.user_id
    user_workspaces.where(user_id: u.id).exists?
  end

  def self.search(searchData, current_user)
    return {} if searchData == ""
    sd = searchData.downcase

    names = sd.split(" ")
    regexp = []
    for_names.each do |el|
      regexp << el
    end
    regexp = regexp.join("|")
    
    data =  User.includes(:associates,
                          :workspaces, :projects, :tasks).find(current_user)

    resultData = {}
    resultData['users'] = data.associates.where('fname ~* ? OR lname ~* ?',
                                                 "(#{regexp})", "(#{regexp})").uniq
    resultData['workspaces'] = data.workspaces.where('LOWER(title) LIKE ?',
                                                     "%#{sd}%").uniq
    resultData['projects'] = data.projects.where('LOWER(projects.title) LIKE ? OR
                                                 LOWER(projects.description) LIKE ?',
                                                 "%#{sd}%", "%#{sd}%").uniq
    resultData['tasks'] = data.tasks.where('LOWER(title) LIKE ?',
                                           "%#{sd}%").uniq
    resultData
  end

end
