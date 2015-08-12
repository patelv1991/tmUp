# == Schema Information
#
# Table name: projects
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  description  :string
#  workspace_id :integer          not null
#  owner_id     :integer
#  due_date     :date
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
