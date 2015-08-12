# == Schema Information
#
# Table name: tasks
#
#  id             :integer          not null, primary key
#  parent_task_id :integer
#  due_date       :date
#  project_id     :integer
#  title          :string           not null
#  body           :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  creator_id     :integer          not null
#  assignee_id    :integer
#  assignor_id    :integer
#  completed      :boolean          default(FALSE)
#

class Task < ActiveRecord::Base
  validates :title, :creator_id, presence: true

  belongs_to :project
  belongs_to(
    :assigned_to,
    class_name: "User",
    foreign_key: :assignee_id,
    primary_key: :id
  )
  
  belongs_to(
    :assignor,
    class_name: "User",
    foreign_key: :assignor_id,
    primary_key: :id
  )

  has_many(
    :sub_tasks,
    class_name: "Task",
    foreign_key: :parent_task_id,
    primary_key: :id
  )

  belongs_to(
    :parent_task,
    class_name: "Task",
    foreign_key: :parent_task_id,
    primary_key: :id
  )

  def self.top_level_tasks
    Task.all.where(parent_task_id: nil)
  end

end
