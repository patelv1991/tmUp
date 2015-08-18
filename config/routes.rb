Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session

  namespace :api, defaults: { format: :json } do
    resource :users, only: [:show]
    resources :workspaces
    resources :projects
    resource :workspace_memberships, only: [:create]
  end
end
