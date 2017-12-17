var config = {
	apiKey: "AIzaSyAwHZ1T327AymOBtUgJ5U4dP8THozg9Z7U",
	authDomain: "train-schedule-b5a67.firebaseapp.com",
	databaseURL: "https://train-schedule-b5a67.firebaseio.com",
	projectId: "train-schedule-b5a67",
	storageBucket: "train-schedule-b5a67.appspot.com",
	messagingSenderId: "54110313549"
};

firebase.initializeApp(config);
var db = firebase.database().ref();

var now = moment().format("HH:mm");
$("#current-time").html(now);
console.log("now", now);
console.log(moment());

db.on("child_added", function(snapshot) {
	console.log("chil_added", snapshot.val());
	var trainRecord = $("<tr>");

	var tdName = $("<td>");
	tdName.html(snapshot.val().name);
	trainRecord.append(tdName);

	var tdDestination = $("<td>");
	tdDestination.html(snapshot.val().destination);
	trainRecord.append(tdDestination);

	var tdFirstTime = $("<td>");
	var firstTime = moment(snapshot.val().first_time, "HH:mm");
	tdFirstTime.html(snapshot.val().first_time);
	trainRecord.append(tdFirstTime);
	// console.log("tdFirstTime", tdFirstTime);

	var tdFrequency = $("<td>");
	var frequency = snapshot.val().frequency;
	tdFrequency.html(frequency);
	trainRecord.append(tdFrequency);

	var endOfDay = moment("24:00", "HH:mm");

	console.log(endOfDay.diff(firstTime,"minutes"));
	console.log("endOfDay", endOfDay);

	for (var i = firstTime; endOfDay.diff(i, "minutes") > 0; i.add(frequency, "m")) {
		console.log("hello");
	}
	// var nextTrain = moment(snapshot.val().first_time, "HH:mm");
	// console.log("snapshot.val().first_time", snapshot.val().first_time);
	// console.log("nextTrain", nextTrain); 

	// console.log("second train is at ", moment(nextTrain.add(frequency, "minutes")).format("HH:mm"));

	var tdTimeUntil = $("<td>");

	$("#trains").append(trainRecord);

});

$("#submit").on("click", function(event){
	event.preventDefault();

	var name = $("#train-name").val().trim(); 
	var destination = $("#train-destination").val().trim();
	var first_time = $("#first-train-time").val(); 
	var frequency = $("#train-frequency").val();

	// console.log("name", name, "destination", destination, "first_time", first_time, "frequency", frequency);

	db.push({
		name: name,
		destination: destination,
		first_time: first_time, 
		frequency: frequency,
	});
});
