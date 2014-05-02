  function showData(selected){
	var dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ],
                  [ 600,   100]
              ];

    // ------------------------------------------------------------------------
    // cages bench press numbers
    // ------------------------------------------------------------------------
    var w = 900;
    var h = 400;
    var padding = 50;

    // ------------------------------------------------------------------------
    // scales
    // ------------------------------------------------------------------------
    var rScale = d3.scale.linear()
    		.domain([0, d3.max(dataset, function(d){return d[1];})])
    		.range([2,15]);

    var xScale = d3.scale.linear()
    		.domain([0, d3.max(dataset, function(d){return d[0];})])
    		.range([padding, w-padding * 4]);

    var yScale = d3.time.scale()
    		.domain([0, d3.max(dataset, function(d){return d[1];})])
    		.range([h-padding,padding]);

    // ------------------------------------------------------------------------
    // axis
    // ------------------------------------------------------------------------
    var xAxis = d3.svg.axis()
    		.scale(xScale)
    		.orient('bottom')
    		.ticks(5);

    var yAxis = d3.svg.axis()
    		.scale(yScale)
    		.orient('left')
    		.ticks(3);


    // ------------------------------------------------------------------------
    // canvas
    // ------------------------------------------------------------------------
    var svg = d3.select('body').append('svg')
    		.attr('width', w)
     		.attr('height', h)
    // ------------------------------------------------------------------------
    // data points
    // ------------------------------------------------------------------------

   	svg.selectAll('circle').data(dataset).enter().append('circle')
   			.on('click', function(d){
   				console.log('Title: ' + d[0] + ' ' + 'Date: ' + d[1])
   			})
   			.attr('cx', function(d){
   				return xScale(d[0]);
   			})
   			.attr('cy', function(d){
   				return yScale(d[1]);
   			})
   			.attr('r', function(d){
   				return rScale(d[1]);
   			})
   			.attr('fill', 'red');
   	
 
   	svg.selectAll('text').data(dataset).enter().append('text')
   			.text(function(d){
   				return d[0] + ',' + d[1];
   			})
   			.attr('x', function(d){
   				return xScale(d[0]);
   			})
   			.attr('y', function(d){
   				return yScale(d[1]);
   			});


   	// ------------------------------------------------------------------------
   	// axis
   	// ------------------------------------------------------------------------
   	svg.append('g')
   			.attr('class', 'axis')
   			.attr("transform", "translate(0," + (h - padding) + ")")
   			.call(xAxis);

   		svg.append('g')
   			.attr('class', 'axis')
   			.attr("transform", "translate(" + padding + ",0)")
   			.call(yAxis);
   	// ------------------------------------------------------------------------
   
}