//URL to be read into script
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
// find part of html code that will change when the dropdown is selected
d3.selectAll("#selDataset").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    //Loading data from URL using D3 and console log for verification
    let data = d3.json(url).then(function(data) {
        console.log(data);
    
        // for loop to cover every otuid
        for (let i = 0; i < data.length; i++) {
            
    
            // Initialize x and y arrays for plotting updated chart
            let x = [];
            let y = [];


            // define samples for later use
            let samples = data["samples"][i];

            // console.log(samples["otu_ids"]);
            // console.log(samples["sample_values"]);
            let otulabels = samples["otu_labels"].slice(0,10);
            let otuid = samples["otu_ids"].toString().split(',').slice(0,10);
            let samplevals = samples["sample_values"].slice(0,10);
            if ("values" === i ) {
                x = [otuid];
                y = [samplevals];
              }
        };
        let trace1  = {
            x: samplevals,
            y: otuid,
            orientation: 'h',
            marker:{width: 10},
            text: otulabels,
            type: 'bar'

        };
        let layout = {
            yaxis:{
                title: {text: 'OTU ID'}},
            xaxis:{
                title: {text: 'Sample Values'}
            }};
        //  console.log(otuid);
        //Data trace array
        let barData = [trace1];

        Plotly.newPlot("bar",barData,layout);

//     //Bubble Chart
//     let trace2 = {
//         x: otuid,
//         y: samplevals,
//         mode: 'markers',
//         marker: {
//             size: samplevals,
//             color: otuid,
//         },
//         text: otulabels
//     };
//     let layout2 = {
//         xaxis:{
//             title: {text: 'OTU ID'}},
//         yaxis:{ 
//             title: {text: 'Sample Values'}}
    
//     };
//     let bubbleData = [trace2];
//     Plotly.newPlot("bubble",bubbleData,layout2);

//     console.log(data["metadata"][0]);
    
}) };
