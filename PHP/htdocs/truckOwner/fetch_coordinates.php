<?php
// Include the necessary configuration and classes
define('DIR', '../');
require_once DIR . 'config.php';

$control = new Controller();
$admin = new Admin();

try {
    // Fetch the coordinates from the database
    $query = "SELECT latitude, longitude FROM your_table_name WHERE userID = :userID";
    $statement = $admin->con->prepare($query);
    $statement->execute([':userID' => $_SESSION['userID']]);
    $result = $statement->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Return the coordinates as a JSON response
        echo json_encode([
            'latitude' => $result['latitude'],
            'longitude' => $result['longitude']
        ]);
    } else {
        // Handle case where no coordinates are found
        http_response_code(404);
        echo json_encode(['error' => 'Coordinates not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch coordinates', 'details' => $e->getMessage()]);
}
?>
