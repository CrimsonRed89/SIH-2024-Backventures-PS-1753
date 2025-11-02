import math

class HubManager:
    def __init__(self, total_workers):  # Corrected the constructor name
        self.total_workers = total_workers
        self.vehicles = []

    def add_vehicle(self, vehicle_type, count):
        """Add a vehicle type and the count expected at the hub."""
        self.vehicles.append({"type": vehicle_type, "count": count})

    def calculate_loading_time(self, vehicle_type):
        """Return estimated time to load a single vehicle of the given type (in minutes)."""
        loading_times = {
            "LCV": 45,
            "MCV": 90,
            "HCV": 180,
            "Multi-Axle": 240,
            "Container": 210,
            "Mini": 30,
        }
        return loading_times.get(vehicle_type, 60)  # Default to 60 minutes if type not found

    def allocate_workers(self):
        """Divide workers into groups to minimize total loading time."""
        if not self.vehicles:
            print("No vehicles added yet.")
            return

        # Calculate total loading effort (time * count of vehicles)
        total_loading_time = 0
        vehicle_efforts = []

        for vehicle in self.vehicles:
            vehicle_type = vehicle["type"]
            count = vehicle["count"]
            time_per_vehicle = self.calculate_loading_time(vehicle_type)
            total_loading_time += time_per_vehicle * count
            vehicle_efforts.append((vehicle_type, count, time_per_vehicle))

        # Determine group allocations
        workers_per_vehicle = max(1, self.total_workers // sum(vehicle["count"] for vehicle in self.vehicles))
        group_allocation = []

        for vehicle_type, count, time_per_vehicle in vehicle_efforts:
            workers_needed = math.ceil(self.total_workers * (time_per_vehicle / total_loading_time))
            group_allocation.append((vehicle_type, workers_needed))

        # Display results
        print("\nWorker Allocation for Quick Loading:")
        for vehicle_type, workers_needed in group_allocation:
            print(f"- {workers_needed} workers assigned to load {vehicle_type} vehicles")

# Example usage
hub = HubManager(total_workers=20)
hub.add_vehicle("LCV", 3)
hub.add_vehicle("HCV", 2)
hub.add_vehicle("Mini", 5)
hub.allocate_workers()
