class Api::WorkspaceMembershipsController < ApplicationController
  before_action :require_signed_in!

  def create
    memberships = params['_json'].flatten
    failed_memberships = []

    memberships.each do |membership|
      @user_workspace_membership = UserWorkspace.new({
        'user_id' => membership['user_id'], 'workspace_id' => membership['workspace_id']
        })
      if @user_workspace_membership.save
        # do nothing
      else
        failed_memberships << @user_workspace_membership.user_id
      end
    end

    if !failed_memberships.empty?
      users = User.find(failed_memberships)
      names = []
      users.each do |user|
        names << user.fname + " " + user.lname
      end

      render json: names, status: 422
    end
  end

  def destroy
    @membership = UserWorkspace.includes(workspace: :users,
                                         workspace: :projects,
                                         workspace: :tasks).find(params[:id])

    if @membership
      @membership.destroy

      # if member being removed from workspace had tasks assigned to him, then
      # following code snippet removes the assignment.
      tasks = @membership.workspace.tasks.where(assignee_id: @membership.user_id).
              update_all(assignee_id: nil)

      workspace_members = @membership.workspace.users
      # if there was only one user in the workspace, it destroys the workspace as well
      if (workspace_members.length == 0)
        @membership.workspace.destroy
      end
    end


    render json: @membership
  end

  private
    def workspace_membership_params
      params.require(:workspace_membership).permit(:_json)
    end

end
