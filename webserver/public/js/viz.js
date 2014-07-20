(function() {

  'use strict';

  var data = [],
      timeout;

  function loadData() {
    d3.json("/api/v1/", function(error, datajson) {
      timeout = setTimeout(loadData, 1000);
      console.log(datajson.Temperatura);
    });
  }

  var n = 10,
      random = d3.random.normal(0, .4);

      data = d3.range(n).map(random);

  var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 1280 - margin.left - margin.right,
      height = 720 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .domain([1, n - 2])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([-1, 1])
      .range([height, 0]);

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });

  // var x = d3.scale.linear()
  //     .domain([1, n - 2])
  //     .range([0, width]);

  // var y = d3.scale.linear()
  //     .domain([0, d3.max(data, function(d) { return d[1]; })])
  //     .range([height, 0]);

  // var line = d3.svg.line()
  //     .interpolate("basis")
  //     .x(function(d, i) { return x(i); })
  //     .y(function(d, i) { return y(d); });


  // var temperatura = d3.select("#temperatura .numero .valor")
  //     .datum(data)
  //     .html(function d(){d.Temperatura});

  var svg = d3.select("#temperatura").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("shape-rendering","optimizeSpeed")
        .attr("color-rendering","optimizeSpeed")
        .attr("viewBox", "0 0 1280 720")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("right"));

  var path = svg.append("g")
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