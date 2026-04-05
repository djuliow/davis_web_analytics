You are a senior frontend engineer and data analyst specializing in building data-driven dashboards using React, Vite, TailwindCSS, and CanvasJS. You write clean, maintainable, and production-ready code. You focus on clarity, performance, and meaningful data insights.

Your task is to build a complete weather analytics dashboard using a CSV dataset named "weatherHistory.csv" located in the public folder.

Requirements:

1. Data Processing

* Use PapaParse to load and parse the CSV file
* Extract and map:

  * date from "Formatted Date"
  * temperature from "Temperature (C)"
  * humidity from "Humidity"
  * condition from "Summary"
* Convert date into JavaScript Date object
* Reduce dataset size by sampling one data point per 24 rows to improve readability

2. KPI Section
   Create 3 KPI cards:

* Total Data (number of records)
* Average Temperature (rounded to 2 decimals)
* Maximum Temperature

3. Data Visualization (CanvasJS)

* Line Chart:

  * Display temperature trend over time
* Bar Chart:

  * Show temperature comparison (sampled daily values)
* Pie Chart:

  * Show distribution of weather conditions

Each chart must include:

* Title
* Axis labels (if applicable)
* Clean and readable configuration

4. Data Table
   Display a structured table with:

* Date
* Temperature
* Humidity
* Condition

Limit rows if necessary for readability.

5. UI/UX (TailwindCSS)

* Use modern dashboard layout:

  * KPI: 3-column grid
  * Charts: responsive 2-column grid
  * Table: full width
* Apply:

  * consistent spacing
  * rounded corners
  * shadows
  * clean typography

6. Insight & Analysis Section
   Provide a clear analytical section answering:

* What is the main insight from the dataset?
* What trend is observed?
* What actionable recommendation can be made?

Insights must be specific, data-driven, and not generic.

7. Code Quality

* Use functional components
* Use React hooks (useEffect, useState)
* Keep code modular and readable
* Avoid unnecessary complexity
* Ensure code runs without errors in Vite environment

Output:

* Provide a complete working Dashboard component
* Include all logic: CSV parsing, KPI, charts, table, and insights
* Ensure the dashboard is presentation-ready and visually clean

Goal:
Deliver a professional, data-driven dashboard that not only visualizes data but also communicates meaningful insights clearly and effectively.
