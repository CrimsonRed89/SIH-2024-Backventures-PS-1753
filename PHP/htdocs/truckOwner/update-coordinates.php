<?php
// Include your database connection and any necessary configuration files
require_once 'config.php';  // Adjust the path if necessary

// Check if the required POST data is available
if (isset($_POST['latitude']) && isset($_POST['longitude'])) {
    // Get the latitude and longitude from the POST request
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    
    // Get the userID from session to update the user's location
    session_start();
    if (isset($_SESSION['userID'])) {
        $userID = $_SESSION['userID'];
        
        // Prepare the SQL query to update the user's coordinates
        $query = "UPDATE users SET latitude = :latitude, longitude = :longitude WHERE userID = :userID";
        $stmt = $pdo->prepare($query);
        
        // Bind the parameters
        $stmt->bindParam(':latitude', $latitude);
        $stmt->bindParam(':longitude', $longitude);
        $stmt->bindParam(':userID', $userID);
        
        // Execute the query
        if ($stmt->execute()) {
            // Return success message
            echo json_encode([
                'status' => 'success',
                'message' => 'Coordinates updated successfully.'
            ]);
        } else {
            // Return failure message
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to update coordinates.'
            ]);
        }
    } else {
        // If user is not logged in, return an error
        echo json_encode([
            'status' => 'error',
            'message' => 'User not logged in.'
        ]);
    }
} else {
    // If no coordinates are sent
    echo json_encode([
        'status' => 'error',
        'message' => 'Coordinates not provided.'
    ]);
}
?>
