if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", function(event) {
        // Extract acceleration values
        const accelX = event.acceleration.x || 0;
        const accelY = event.acceleration.y || 0;
        const accelZ = event.acceleration.z || 0;

        // Determine driving behavior
        let result = "Normal Driving";

        if (accelY < -10) {
            result = "Likely Rash Driving (Sudden Braking)";
        }

        if (Math.abs(accelX) > 15 || Math.abs(accelZ) > 15) {
            result = "Likely Rash Driving (Aggressive Turning)";
        }

        // Update status on screen
        document.getElementById("status").innerText = result;
    });
} else {
    document.getElementById("status").innerText = "Device Motion not supported";
}
