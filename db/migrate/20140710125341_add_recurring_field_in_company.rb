class AddRecurringFieldInCompany < ActiveRecord::Migration
  def change
  	add_column :companies, :recurring_cancel,:boolean
  end
end
