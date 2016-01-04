var today = new Date();	//create a new date object
var staticToday = new Date(); //a static marker for the current date

var buildCalendar = function (date) {
	var initialMonthDay = new Date(date.getFullYear(), date.getMonth(), 1);	//determine the full date of the first day of the month
	var finalMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);	//determine the full date of the last day of the month
	var firstDay = initialMonthDay.getDay();	//get the day of the week 0 through 6 that the first day falls on
	var lastDay = finalMonthDay.getDay();	//get the day of the week 0 through 6 that the last day falls on
	var daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();	//determine how many total days occur in the current month
	var year = date.getFullYear();	//returns the year in the format of (YYYY)
	var day = date.getDate() - 1;	//returns the day of the month in the format of (DD)
	var month = date.getMonth();	//returns the month of the year in the format of (MM)

	var table = $("#table");
	var calRow;
	var j = 1;

	var monthOfYearMap = {
					
			0 : "January",
			1 : "February",
			2 : "March",
			3 : "April",
			4 : "May",
			5 : "June",
			6 : "July",
			7 : "August",
			8 : "September",
			9 : "October",
			10: "November",
			11: "December",

	};

	var htmlString = '<tr><th colspan = "1" class="navigation"><i class="fa fa-angle-left"></i></th><th colspan = "5" class="month"></th><th colspan = "1" class= "navigation"><i class="fa fa-angle-right"></i></th></tr><tr class="week"><td>Sun </td><td>Mon </td><td>Tues </td><td>Wed </td><td>Thur </td><td>Fri </td><td>Sat</td></tr>';
	
	var html = $(htmlString);

	var currentMonthYear = html.find(".month");				//find the element with the class: "month" 
	currentMonthYear.html(monthOfYearMap[date.getMonth()] + "<br>" + year); //change the inner html of the element to the current month

	$("#table").append(html);

	for (var i = 0; i < daysInMonth + firstDay; i++) {	//add the appropriate number of days to the calendar for the current month

	    if (i % 7 == 0) {				//create a new row every seven days
	    	calRow = $("<tr>");			//crete a new row element
	        table.append(calRow);		//add the row to the table
	    }
	    if (i < firstDay) {				//if the first day of the month does not begin on that day
	    	calRow.append("<td>");		//add empty cells to the current row
		}

		else {							//the month has begun
			if (i == day + firstDay && today.getMonth() == staticToday.getMonth() && today.getFullYear() == staticToday.getFullYear()) {
				calRow.append("<td class='today'><div>" + j + "</div></td>");		//create a cell with the id 'today' to identify the current day
				j++;
			}
			if ((i < day + firstDay && today.getMonth() == staticToday.getMonth() && today.getFullYear() == staticToday.getFullYear()) || (today.getMonth() < staticToday.getMonth() && today.getFullYear() == staticToday.getFullYear()) || (today.getFullYear() < staticToday.getFullYear())) {
					calRow.append("<td class='past'><div>" + j + "</div></td>");
					j++;
			}
			if ((i > day + firstDay && today.getMonth() == staticToday.getMonth() && today.getFullYear() == staticToday.getFullYear()) || (today.getMonth() > staticToday.getMonth() && today.getFullYear() == staticToday.getFullYear()) || (today.getFullYear() > staticToday.getFullYear()) ) {
					calRow.append("<td class='future'><div>" + j + "</div></td>");	//add the day to the calendar
					j++;
			}
		}
	}

	$(".fa-angle-left").click(function() {

		$("#table").empty();
		today.setMonth(today.getMonth() - 1);
		buildCalendar(today);
	
	});

	$(".fa-angle-right").click(function() {

		$("#table").empty();
		today.setMonth(today.getMonth() + 1);
		buildCalendar(today);

	});

	$("div").click(function() {
		$("div").removeClass("selected");
		$(this).addClass("selected");
	});
};

buildCalendar(today);	//index calendar