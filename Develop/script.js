// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs();

  // let taskArray = [];


    // get stored tasks from local storage & add each to their designated element in html
    if (localStorage.getItem("tasks") != null) {
      let storedTasks = JSON.parse(localStorage.getItem("tasks"));

      var taskArray = []; 
      for (var i = 0; i < storedTasks.length; i++) {
        $(`#${storedTasks[i].id}`).children("textarea").html(storedTasks[i].description);
        // console.log(storedTasks[i].description)
        taskArray.push(storedTasks[i]);
      }
    } else {
      var taskArray = [];
    }
  
  // saves each task and saves to local storage
  $(".saveBtn").click(function() {
    let getParentId = $(this).parent().attr("id");
    let siblingEl = $(this).siblings("textarea").val();
    let storeTasks = {
        "id": getParentId,
        "description": siblingEl
      }
      taskArray.push(storeTasks);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    console.log(taskArray) //testing
  })

  // changes colour of the hour based on the current time
  for (var i = 0; i < 24; i++) {
    if (now.format("H") == i) {
      $(`#hour-${i}`).removeClass("future");
      $(`#hour-${i}`).addClass("present");
   } else if (now.format("H") > i) {
      $(`#hour-${i}`).removeClass("future");
      $(`#hour-${i}`).removeClass("present");
      $(`#hour-${i}`).addClass("past");
    }
  }

    // updates on page reload
    // display today's date
    $("#currentDay").html(now.format("ddd, MMM DD, YYYY"));
    // display the current time
    $("#currentHour").html(now.format("h:mm A"));
  
});