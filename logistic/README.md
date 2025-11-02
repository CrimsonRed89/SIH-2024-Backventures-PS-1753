# React Logistics Dashboard

![image](https://user-images.githubusercontent.com/59290280/186193795-c268df95-d1d7-4e43-b430-309383aad1d5.png)

The Logistics Manager Dashboard is a web app that allows users to manage resources and track earnings over time. The application includes a React.JS frontend, Firebase cloud data storage, and routing through React Router DOM. 

## Features

![image](https://user-images.githubusercontent.com/59290280/186196361-3ce7c641-d9db-4e44-80a7-3eb67871582d.png)

### Sortable, Filterable Data Tables

Data tables contain the information for trucks, trips, and facilities. Material UI's data grid library serves as each interactive table's backbone, providing sortable and filterable data with built-in pagination.

![image](https://user-images.githubusercontent.com/59290280/186197997-a24b363c-abaa-4d15-bbe0-3d7565ba3c5e.png)

### Individual Records and Related Resources

Users can view every individual resource in further detail by clicking on "View" on its respective data table. Trucks and facilities "details" page show information regarding related trips, including a data table and a chart detailing revenue from the trips. 

![image](https://user-images.githubusercontent.com/59290280/186199203-1edda6ba-4464-4576-83eb-c1070727839d.png)

### Calendars and Maps

On the trip "details" page, libraries provide users with incredible functionality through fully interactive maps and calendars. Leaflet's map component plots the origin and destination facilities, showing users the scale of a given trip. React Big Calendar serves to plan the trip dates on a calendar, allowing users to strategize around service availability depending on days of the week or holidays. 
