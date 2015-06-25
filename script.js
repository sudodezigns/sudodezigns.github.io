$(document).ready(function () {
	$("#insert-menu").load("/menu.html");
	$("#insert-footer").load("/footer.html");
	$("#insert-menu-bottom").load("/menu-bottom.html");

	var pageType = $("body").attr("data-page-type");
  var year = $("body").attr("data-year");
  var month = $("body").attr("data-month");
  console.log("This is the " + pageType + " of " + month + ", " + year);
  if (pageType == 'stringer') {
    $("#menu-home").removeClass("active");
    $("#menu-stringer-reports").addClass("active");
    } else {
      if (pageType == "reporter") {
        if (year == "2015") {
          $("#menu-home").removeClass("active");
  		    $("#menu-2015-reports").addClass("active");
          if (month == "january") {
            $("#jan-15").addClass("active");
          } else {
            if (month == "february") {
              $("#feb-15").addClass("active");
            } else {
              if (month == "march") {
                $("#mar-15").addClass("active");
              } else {
                if (month == "april") {
                  $("#apr-15").addClass("active");
                } else {
                  if (month == "may") {
                    $("#may-15").addClass("active");
                  }
                }
              }
            }
          }
        } else {
          if (year == "2014") {
	          $("#menu-home").removeClass("active");
	  		    $("#menu-2014-reports").addClass("active");
	          if (month == "october") {
	            $("#oct-14").addClass("active");
	          } else {
	            if (month == "november") {
	              $("#nov-14").addClass("active");
	            } else {
	              if (month == "december") {
	                $("#dec-14").addClass("active");
	              }
	            }
	          } 
          } else { $("#menu-home").addClass("active"); }
        }
      }
    };
  if (($(document).width()) < 992) {
    $("#insert-menu>nav>div").add("text","MENU").attr("class","btn");
  }
});