class Api::WorkspaceMembershipsController < ApplicationController
  # before_action :require_signed_in!

  def create
    memberships = workspace_membership_params.flatten
    memberships.each do |membership|
      debugger
      @user_workspace_membership = UserWorkspace.create!(membership)
      render json: @user_workspace_membership
    end
  end


  private
    def workspace_membership_params
      params.require(:workspace_membership).permit(:_json)
    end

end
