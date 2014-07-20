(function() {

  'use strict';


  var margin = 20,
      width = parseInt(d3.select("#chart").style("width")) - margin*2,
      height = parseInt(d3.select("#chart").style("height")) - margin*2;
  var data = [],
      timeout;

  function loadData() {
    d3.json("/api/v1/", function(error, datajson) {
      timeout = setTimeout(loadData, 1000);
      // console.log(datajson.Temperatura);
    });
  }
  
  loadData(); 

  var n = 10,
      random = d3.random.normal(0, .4);

      data = d3.range(n).map(random);


  var x = d3.scale.linear()
      .domain([1, n - 2])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([-1, 1])
      .range([height, 0])
      .nice();

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("right");


  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });


  // var temperatura = d3.select("#temperatura .numero .valor")
  //     .datum(data)
  //     .html(function d(){d.Temperatura});

  var chart = d3.select("#chart")
        .attr("width", width + margin*2)
        .attr("height", height + margin*2)
        .attr("shape-rendering","optimizeSpeed")
        .attr("color-rendering","optimizeSpeed")
      .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

  chart.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var path = chart.append("g")
      .attr("clip-path", "url(#clip)")
    .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  tick();

  function tick() {

    // push a new data point onto the back
    data.push(random());

    loadData();

    // redraw the line, and slide it to the left
    path
        .attr("d", line)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + x(0) + ",0)")
        .each("end", tick);

    // pop the old data point off the front
    data.shift();

  }

})()