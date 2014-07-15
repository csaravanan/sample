class CreateDashboardCharts < ActiveRecord::Migration
  def change
    create_table :dashboard_charts do |t|
      t.string :name
      t.integer :company_id
      t.string :x_axis
      t.string :y_axis
      t.string :chart_type
      t.integer :order
      t.timestamps
    end
  end
end
