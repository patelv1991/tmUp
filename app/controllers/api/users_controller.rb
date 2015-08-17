class Api::UsersController < ApplicationController
  def show
    @users = User.where(email: params[:emails])
  end

end
