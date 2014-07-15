class DashboardChart < ActiveRecord::Base
	
	validates :name, presence:true
	validates :x_axis, presence:true
	validates :y_axis, presence:true
	validates :chart_type, presence:true
	
	#Association
	belongs_to :company
	
	def self.update_chart_order(order)
		order.each_with_index do |id, index|
			dashboard_chart = DashboardChart.find_by_id(id)
			dashboard_chart.update(:order => index)
		end
	end
end
