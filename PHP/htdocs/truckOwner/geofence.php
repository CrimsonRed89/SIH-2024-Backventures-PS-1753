<?php 
define('DIR','../');
require_once DIR .'config.php';

$control = new Controller();
$admin = new Admin();

if(!(isset($_SESSION["userID"]))) {
    header("location:login.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php include"include/links.php" ?>
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <?php include"include/sidebar.php" ?>

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <?php include"include/header.php" ?>
                <!-- End of Topbar -->

                <div>
                   <div class="card shadow mb-4">
                        <div class="card-header py-3">
                                <h4 class="m-0 font-weight-bold text-primary">
                                    <a href="index.php">HOME</a> / Location
                                </h4>
                        </div>
                        <div class="card-body">
                            <div id="map" style="width: 100%; height: 500px;"></div>

                            <!-- Update Location Button -->
                            <button id="updateLocationButton" class="btn btn-primary mt-3">Update Location</button>

                            <!-- Display Coordinates -->
                            <div id="coordinatesDisplay" class="mt-3">
                                <p><strong>Current Coordinates:</strong> <span id="currentCoordinates">Loading...</span></p>
                                <p><strong>Saved Coordinates (from Cookies):</strong> <span id="savedCoordinates">None</span></p>
                            </div>

                            <!-- Radius Input -->
                            <div>
                                <label for="radiusInput">Enter Radius (km):</label>
                                <input type="number" id="radiusInput" value="100" min="1" class="form-control">
                                <!-- Button to update radius -->
                                <button id="updateRadiusButton" class="btn btn-primary mt-3">Update Radius</button>
                            </div>

                            <script>
                                // Function to set a cookie
                                function setCookie(name, value, days) {
                                    var d = new Date();
                                    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                                    var expires = "expires=" + d.toUTCString();
                                    document.cookie = name + "=" + value + ";" + expires + ";path=/";
                                }

                                // Function to get a cookie value by name
                                function getCookie(name) {
                                    var nameEQ = name + "=";
                                    var ca = document.cookie.split(';');
                                    for (var i = 0; i < ca.length; i++) {
                                        var c = ca[i];
                                        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                                    }
                                    return null;
                                }

                                // Initialize map and load location from cookies
                                function initMap() {
                                    var map, marker, circle;

                                    // Retrieve coordinates from cookies
                                    var lat = getCookie('latitude');
                                    var lng = getCookie('longitude');

                                    // Display saved coordinates from cookies
                                    if (lat && lng) {
                                        document.getElementById('savedCoordinates').innerHTML = 'Latitude: ' + lat + ', Longitude: ' + lng;
                                    } else {
                                        document.getElementById('savedCoordinates').innerHTML = 'None';
                                    }

                                    // Get current coordinates and display them
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(function(position) {
                                            var currentLocation = {
                                                lat: position.coords.latitude,
                                                lng: position.coords.longitude
                                            };

                                            // Display current coordinates
                                            document.getElementById('currentCoordinates').innerHTML = 'Latitude: ' + currentLocation.lat + ', Longitude: ' + currentLocation.lng;

                                            // If cookies are found, use them; otherwise, use current coordinates
                                            var location = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : currentLocation;

                                            // Initialize the map with either saved or current coordinates
                                            map = new google.maps.Map(document.getElementById('map'), {
                                                zoom: 15,
                                                center: location
                                            });

                                              // Add a marker with a title (name of the location)
                                              marker = new google.maps.Marker({
                position: location,
                map: map,
                title: "India Post Warehouse", // Marker title (tooltip when hovered)
                label: {
                    text: "India Post Warehouse", // Name of the location
                    color: "yellow", // Color of the label
                    fontSize: "20px", // Font size of the label
                    fontWeight: "bold" // Font weight of the label
                }
            });
                                            // Draw geofence circle based on radius input
                                            var radius = parseFloat(document.getElementById('radiusInput').value) * 1000; // Convert to meters
                                            circle = new google.maps.Circle({
                                                map: map,
                                                radius: radius,
                                                center: location,
                                                strokeColor: "#FF0000",  // Red color for the border of the circle
                                                strokeOpacity: 0.8,
                                                strokeWeight: 2,
                                                fillColor: "#FF0000",    // Red color for the fill of the circle
                                                fillOpacity: 0.35
                                            });

                                            // Function to calculate distance between two coordinates (in km)
                                            function calculateDistance(lat1, lng1, lat2, lng2) {
                                                var R = 6371; // Radius of the Earth in km
                                                var dLat = (lat2 - lat1) * Math.PI / 180;
                                                var dLng = (lng2 - lng1) * Math.PI / 180;
                                                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                                                    Math.sin(dLng / 2) * Math.sin(dLng / 2);
                                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                                var distance = R * c; // Distance in km
                                                return distance;
                                            }

                                            // Check if the current position is inside the geofence
                                            function checkGeofence() {
                                                var radius = parseFloat(document.getElementById('radiusInput').value) * 1000;
                                                var distance = calculateDistance(currentLocation.lat, currentLocation.lng, location.lat, location.lng);
                                                
                                                if (distance <= radius) {
                                                    alert("You are inside the geofence.");
                                                } else {
                                                    alert("You are outside the geofence.");
                                                }
                                            }

                                            // Trigger geofence check when updating location
                                            document.getElementById('updateLocationButton').onclick = function() {
                                                if (navigator.geolocation) {
                                                    navigator.geolocation.getCurrentPosition(function(position) {
                                                        var location = {
                                                            lat: position.coords.latitude,
                                                            lng: position.coords.longitude
                                                        };

                                                        // Set coordinates in cookies
                                                        setCookie('latitude', location.lat, 7);  // Store for 7 days
                                                        setCookie('longitude', location.lng, 7); // Store for 7 days

                                                        // Display updated coordinates
                                                        document.getElementById('currentCoordinates').innerHTML = 'Latitude: ' + location.lat + ', Longitude: ' + location.lng;

                                                        // Update the map with the new location
                                                        map.setCenter(location);
                                                        marker.setPosition(location);
                                                        circle.setCenter(location);

                                                        // Check geofence
                                                        checkGeofence();

                                                        // Update saved coordinates display
                                                        document.getElementById('savedCoordinates').innerHTML = 'Latitude: ' + location.lat + ', Longitude: ' + location.lng;
                                                    });
                                                } else {
                                                    alert('Geolocation is not supported by this browser.');
                                                }
                                            };

                                            // Update the radius of the geofence when the button is clicked
                                            document.getElementById('updateRadiusButton').onclick = function() {
                                                var newRadius = parseFloat(document.getElementById('radiusInput').value) * 1000; // Convert to meters
                                                if (circle) {
                                                    circle.setRadius(newRadius); // Update the radius of the circle
                                                }
                                            };

                                        });
                                    } else {
                                        alert('Geolocation is not supported by this browser.');
                                    }
                                }
                            </script>

                            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrF8zFKWIDqUqVRvBueIWN5Ib70ga3hUc&callback=initMap"></script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/chart.js/Chart.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/chart-area-demo.js"></script>
    <script src="js/demo/chart-pie-demo.js"></script>

</body>

</html>
