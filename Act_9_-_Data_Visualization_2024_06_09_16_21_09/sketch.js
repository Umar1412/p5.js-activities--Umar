
let salesData;

// Preload Function
function preload() {
  // CSV file 'Sales Chart.csv' with header
  salesData = loadTable('Sales Chart.csv', 'csv', 'header');
}

// Setup function
function setup() {
  
  createCanvas(400, 400);
  
  // starting angle 
  let angle = 0;
  
  // Loop through each row of the CSV data
  for (let i = 0; i < salesData.getRowCount(); i++) {
    // Get the row of data
    let row = salesData.getRow(i);
    
    // Extract the percentage value from the row
    let percentage = row.getNum('Percentage');
    
    // Extract the color value from the row
    let color = row.getString('Color');
    
    // Extract the item name from the row
    let item = row.getString('Items');
    
    // Calculate the angle increase for the current segment
    let angleIncrease = map(percentage, 0, 100, 0, TWO_PI);
    
    // Set the fill color for the current segment
    fill(color);
    
    // Draw a pie slice representing the current segment
    arc(width / 2, height / 2, 300, 300, angle, angle + angleIncrease, PIE);
    
    // Update the angle 
    angle += angleIncrease;
    
    // Add legend
    fill(0);
    let legendX = width / 2 + 100;
    let legendY = i * 20 + 50;
    rect(legendX, legendY, 15, 15);
    textAlign(LEFT, CENTER);
    textSize(12);
    fill(0);
    
    // Display item name and percentage in the legend
    text(item + " - " + percentage + "%", legendX + 20, legendY + 8);
  }
}
