class Api::WorkspaceMembershipsController < ApplicationController
  # before_action :require_signed_in!

  def create
    memberships = params['_json'].flatten

    memberships.each do |membership|
      @user_workspace_membership = UserWorkspace.create!({
        'user_id' => membership['user_id'], 'workspace_id' => membership['workspace_id']
        })
      # render json: @user_workspace_membership
    end
  end


  private
    def workspace_membership_params
      params.require(:workspace_membership).permit(:_json)
    end

end
