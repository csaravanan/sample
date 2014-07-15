class DashboardController < ApplicationController
	
	before_filter :company_module_access_check
	before_filter :check_plan_expire
  #Audit Calender Page
	def calender
		@audit = current_user.accessible_audits
	end

  # Main Dashboard page
  def index
		@dashboard_chart = DashboardChart.new
		@charts = current_company.dashboard_charts.sort_by{|x| x.order}
		@compliance_audits = Audit.compliance_audits.count
		@non_compliance_audits = Audit.non_compliance_audits.count
		@audit_types = [@compliance_audits , @non_compliance_audits]
  end
	
	def create
		@dashboard_chart = DashboardChart.new(dashboard_chart_params)
		@dashboar_max_order = current_company.dashboard_charts.empty? ? 1 : current_company.dashboard_charts.map(&:order).max
		@dashboard_chart.order = @dashboar_max_order+1
			@charts = current_company.dashboard_charts 		if @dashboard_chart.save
		respond_to :js
	end
	
	def update
		order_arr = params[:order].split(",")
		DashboardChart.update_chart_order(order_arr)
		respond_to :js
	end

	def destroy
		@chart = DashboardChart.find_by_id(params[:id])
		@chart.destroy
		respond_to :js
	end
	private
	
	def dashboard_chart_params
		params.require(:dashboard_chart).permit(:id, :name, :company_id, :x_axis, :y_axis, :chart_type, :order)
	end
end
