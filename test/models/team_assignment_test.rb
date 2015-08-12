# == Schema Information
#
# Table name: team_assignments
#
#  id         :integer          not null, primary key
#  project_id :integer          not null
#  member_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class TeamAssignmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
