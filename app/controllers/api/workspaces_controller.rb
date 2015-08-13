class Api::WorkspacesController < ApplicationController

  def create
    @workspace = current_user.workspaces.new(workspace_params)
    if @workspace.save
      render json: @workspace
    else
      render json: @workspace.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @workspaces = current_user.workspaces
    render json: @workspaces
  end

  def show
    # this can be optimized using joins
    # w = current_user.workspaces.includes(projects: :tasks).where(tasks: {assignee_id: current_user.id})
    # w = current_user.workspaces.includes(projects: :tasks).where("workspaces.id = ?", params[:id]).where(tasks: {assignee_id: 1})
    # above two lines return workspace. Need to get projects and tasks from that.
    # But, this time, it doesn't go back to database.
    # w.map {|space| space.projects.map(&:tasks)}.flatten


    workspaces = current_user.workspaces.includes(projects: :tasks)

    if workspaces.where(id: params[:id]).exists?
      @workspace = workspaces.find(params[:id])
      render :show
    else
      render json: ["You aren't a member of this board"], status: 403
    end

  end

  def destroy
    @workspace = current_user.workspaces.includes(:users).find(params[:id])
    if @workspace.users.length <= 1
      @workspace.destroy
    else
      membership = @workspace.user_workspaces.select { |m| m.user_id ==
            current_user.id && m.workspace_id == @workspace.id }
      membership.first.destroy
    end

  end

  private
    def workspace_params
      params.require(:workspace).permit(:id, :title)
    end

end
