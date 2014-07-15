function load_chart(chart_type, x_axis_record, y_axis_record, div_id, y_axis_type, x_axis_type, pie_chart_input)
{
if (chart_type == 'Bar')
{
    var dataSum = 0;
for (var i=0;i < y_axis_record.length;i++) {
    dataSum += y_axis_record[i]
}
$(function () {
        $('#'+div_id).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: x_axis_record
            },
            yAxis: {
                min: 0,
              labels: {
                formatter:function() {
                if (y_axis_type == 'Percentage') {
                    var pcnt = (this.value / dataSum) * 100;
                    return Highcharts.numberFormat(pcnt,0,',') + '%';
                }
                else {
                return Highcharts.numberFormat(this.value) ;
                    }
                }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels:{
                enabled:true,
                formatter:function() {
                    if (y_axis_type == 'Percentage') {
                    var pcnt = (this.y / dataSum) * 100;
                    return Highcharts.numberFormat(pcnt) + '%';
                    }
                }
            }
                }
            },
            series: [{
                name: x_axis_type,
                data: y_axis_record
    
            }]
        });
    });
	}
	else if (chart_type == 'Pie')
		{
		$(function () {
				//~ Highcharts.data({
        //~ csv: document.getElementById('tsv').innerHTML,
        //~ itemDelimiter: '\t',
        //~ parsed: function (columns) {
                //~ drilldownSeries = [];
            // Create the chart
                 $('#'+div_id).highcharts({
                chart: {
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    pointFormat: '<span style="color:{point.color}">'+x_axis_type+'</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

						series: [{
                  data: pie_chart_input
                }],
                drilldown: {
                    //~ series: drilldownSeries
                }
					});
        //~ }
			//~ });
	});
	}
	else 
	{
		$(function () {
        $('#'+div_id).highcharts({
						title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: x_axis_record
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Percentage'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:{
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                data: y_axis_record
            }]
        });
    });
	}
}

function chart_destroy(id)
{
if (confirm('Are you sure?')) {
                    $.ajax({
                    url: "/dashboard/"+id, 
                    type: 'delete'
                    });	
}
}

function widget_validation()
{
var name = $('#widget_name').val()
var x_axis = $('#dashboard_chart_x_axis').val()
var y_axis = $('#dashboard_chart_y_axis').val()
var chart_type = $('#dashboard_chart_chart_type').val()
var widget_name = name_validation();
var widget_x_axis = x_axis_validation();
var widget_y_axis = y_axis_validation();
var widget_chart_type = chart_type_validation();
if (widget_name && widget_x_axis && widget_y_axis && widget_chart_type)
{
return true
}
else
{
return false
}
function name_validation()
{
if (name == '')
{
$('#widget_name').addClass("error_input");
$('#widget_name_error').show()
return false
}
else
{
$('#widget_name').removeClass("error_input");
$('#widget_name_error').hide()
return true
}
}
function x_axis_validation()
{
if (x_axis == '-Select X-Axis-' || x_axis == '')
{
$('#dashboard_chart_x_axis').addClass("error_input");
$('#widget_x_axis_error').show()
return false
}
else
{
$('#dashboard_chart_x_axis').removeClass("error_input");
$('#widget_x_axis_error').hide()
return true
}
}
function y_axis_validation()
{
if (y_axis == '-Select Y-Axis-' || y_axis == '')
{
$('#dashboard_chart_y_axis').addClass("error_input");
$('#widget_y_axis_error').show()
return false
}
else
{
$('#dashboard_chart_y_axis').removeClass("error_input");
$('#widget_y_axis_error').hide()
return true
}
}
function chart_type_validation()
{
if (chart_type == '-Select Chart Type-' || chart_type == '')
{
$('#dashboard_chart_chart_type').addClass("error_input");
$('#widget_chart_type_error').show()
return false
}
else
{
$('#dashboard_chart_chart_type').removeClass("error_input");
$('#widget_chart_type_error').hide()
return true
}
}
}