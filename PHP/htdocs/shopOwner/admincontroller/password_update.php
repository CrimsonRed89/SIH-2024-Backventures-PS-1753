<?php
define('DIR', '../../');
require_once DIR . 'config.php';

$control = new Controller();
$admin = new Admin();
$con = mysqli_connect("localhost", "root", "", "casadb");

if (isset($_POST['updatePassword'])) {
    $email = mysqli_real_escape_string($con, trim($_POST['userEmail']));
    $newPassword = trim($_POST['newPassword']);
    $confirmPassword = trim($_POST['confirmPassword']);

    // Ensure new passwords match
    if ($newPassword !== $confirmPassword) {
        echo "<script>
            alert('New passwords do not match.');
            window.location.href='password_update.php';
        </script>";
        exit();
    }

    // Retrieve the user based on email
    $stmt = $admin->ret("SELECT * FROM `users` WHERE `userEmail` = '$email'");
    $num = $stmt->rowCount();

    if ($num > 0) {
        // Hash the new password
        $newHashedPass = password_hash($newPassword, PASSWORD_BCRYPT);

        // Update the password in the database
        $admin->cud("UPDATE `users` SET `userPassword` = '$newHashedPass' WHERE `userEmail` = '$email'", "updated");
        
        echo "<script>
            alert('Password updated successfully.');
            window.location.href='../login.php';
        </script>";
    } else {
        // Email not found in the database
        echo "<script>
            alert('Email not registered.');
            window.location.href='password_update.php';
        </script>";
    }
}
?>
