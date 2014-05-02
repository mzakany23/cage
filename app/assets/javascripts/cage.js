function showCage(selected){
    
    d3.csv(selected, function(data){
    
        // ----------------------------------------------------------------------------
        // cage bench press numbers
        // ----------------------------------------------------------------------------

        var h = 900,
            w = 1000,
            padding = 50,
            axisPadding = 50,
            xAxisPadding = 60,
            yAxisPadding = 60;


        // ----------------------------------------------------------------------------
        // date variables
        // ----------------------------------------------------------------------------

        var salesMax = d3.max(data, function(d){return +d['lifetime_gross_sales'];})
        var salesMin = d3.min(data, function(d){return +d['lifetime_gross_sales'];})    
        var maxDate = d3.max(data, function(d){return new Date(d['movie_date'])})
        var minDate = d3.min(data, function(d){return new Date(d['movie_date'])})

        // ----------------------------------------------------------------------------
        // scales
        // ----------------------------------------------------------------------------

        var timeScale = d3.time.scale()
            .domain([minDate,maxDate])
            .range([h-yAxisPadding, 25])


        var xScale = d3.scale.linear()
                .domain([0,salesMax])
                .range([xAxisPadding, w-xAxisPadding ])

        var rScale = d3.scale.linear()
                .domain([0, salesMax])
                .range([2, 50])


        // ----------------------------------------------------------------------------
        // axis variables
        // ----------------------------------------------------------------------------

        var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .ticks(10);

        var yAxis = d3.svg.axis()
                .scale(timeScale)
                .orient('left')
                .ticks(10)
    

        // ----------------------------------------------------------------------------
        // scatter plot
        // ----------------------------------------------------------------------------
        
        var scatter = d3.select('body').append('svg')
                .attr('height', h)
                .attr('width', w)


        scatter.selectAll('circle').data(data).enter().append('circle')
                .attr('cx', function(d){
                    return xScale(+d['lifetime_gross_sales']);
                })
                .attr('cy', function(d){
                    var formatted_date = new Date(d['movie_date'])
                    return timeScale(formatted_date);
                })
                .style('fill', function(d){
                    var sales = +d['lifetime_gross_sales']
                    return rScale(sales)
                })
                .attr('r', function(d){
                    var sales = +d['lifetime_gross_sales']
                    return rScale(sales)
                })
            

        // ----------------------------------------------------------------------------
        // tool tip code
        // ----------------------------------------------------------------------------
       
       function toUSD(number) {
            var number = number.toString(), 
            dollars = number.split('.')[0], 
            cents = (number.split('.')[1] || '') +'00';
            dollars = dollars.split('').reverse().join('')
                .replace(/(\d{3}(?!$))/g, '$1,')
                .split('').reverse().join('');
            return '$' + dollars + '.' + cents.slice(0, 2);
        }


        $('svg circle').tipsy({
            gravity: 'w',
            html: true,
            title: function(){
                var d = this.__data__;
                var title = "TITLE: " + d['title']
                var date = 'DATE: ' + d['movie_date']
                var amount = 'LIFETIME GROSS SALES: ' + toUSD(+d['lifetime_gross_sales'])
                return  title + '\n' + date + "\n" + amount
            }
        });


        // ----------------------------------------------------------------------------
        // plot axis
        // ----------------------------------------------------------------------------

        scatter.append('g')
                .attr("transform", "translate(0," + (h - padding) + ")")
                .attr('class', 'cageAxis')
                .call(xAxis)

        scatter.append('g')
                .attr("transform", "translate(" + padding + ",0)")
                .attr('class', 'cageAxis')
                .call(yAxis)

        // ----------------------------------------------------------------------------
   

    })
     
}

function appendDataSet(selected) {
        
}


