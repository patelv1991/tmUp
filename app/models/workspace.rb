# == Schema Information
#
# Table name: workspaces
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Workspace < ActiveRecord::Base
  attr_accessor :link, :data, :time
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
    name_regexp = "(#{sd.split(" ").join("|")})"

    # sets initial time and fetches data if it doesn't exists in cache
    @time ||= Time.new
    @data ||= User.includes(:workspaces,
                            associates: :user_workspaces,
                            projects: :tasks)
                            .find(current_user)

    # uses same cache for 60 seconds
    if Time.new - @time > 60
      @data = User.includes(:workspaces,
                            associates: :user_workspaces,
                            projects: :tasks)
                            .find(current_user.id)
      @time = Time.new
    else
      @data
    end

    resultData = {}
    resultData['users'] = find_users(name_regexp)
    resultData['workspaces'] = find_workspaces(sd)
    resultData['projects'] = find_projects(sd)
    resultData['tasks'] = find_tasks(sd)
    resultData
  end

  def self.find_users(name_regexp)
    users = @data.associates.select do |user|
      user.fname.match(/#{name_regexp}/i) || user.lname.match(/#{name_regexp}/i)
    end
    users.uniq!

    users.each_with_index do |user, idx|
      current_users_workspaces = {}
      @data.workspaces.each do |w|
        current_users_workspaces[w.id] = w.title
      end

      selected_users_workspaces = {}
      user.user_workspaces.each do |m|
        selected_users_workspaces[m.workspace_id] = true
      end

      current_users_workspaces.
              select! { |id, title| selected_users_workspaces[id] }

      user.ws = current_users_workspaces
      workspace_id = current_users_workspaces.first[0]
      user.link = "workspaces/#{workspace_id}/user/#{user.id}"
    end
  end

  def self.find_workspaces(sd)
    workspaces = @data.workspaces.select do |w|
      w.title.match(/#{sd}/i)
    end
    workspaces.uniq!

    workspaces.each do |workspace|
      workspace.link = "workspaces/#{workspace.id}"
    end
  end

  def self.find_projects(sd)
    projects = @data.projects.select do |project|
      project.title.match(/#{sd}/i) ||
          (project.description && project.description.match(/#{sd}/i))
    end
    projects.uniq!

    projects.each do |project|
      project.link = "workspaces/#{project.workspace_id}/project/#{project.id}"
    end
  end

  def self.find_tasks(sd)
    tasks = []
    project_workspace_id = {}
    @data.projects.each do |project|
      project_workspace_id[project.id] = project.workspace_id
      t = project.tasks.select do |t|
        t.title.match(/#{sd}/i)
      end
      tasks += t unless t.empty?
    end
    tasks.uniq!

    tasks.each do |task|
      project_id = task.project_id
      workspace_id = project_workspace_id[project_id]
      task.link = "workspaces/#{workspace_id}/project/#{project_id}"
    end
  end

end
