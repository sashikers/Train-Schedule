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
	tdFirstTime.html(snapshot.val().first_time);
	trainRecord.append(tdFirstTime);

	var tdFrequency = $("<td>");
	tdFrequency.html(snapshot.val().frequency);
	trainRecord.append(tdFrequency);

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
