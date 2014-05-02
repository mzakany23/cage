function showPerfin(selected){
    d3.csv(selected, function(data){

    dataset = data;

    d3.select('body').selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .attr('class', 'bar')
        .style('height', function(d){
            var amount = +d.Amount;
            var posAmount = amount*-1;
            if(posAmount > 500){
                

            }else{
                return posAmount + 'px';    
            }
        })
        .attr('class', function(d){
            amount = +d.Amount
            if(amount < 500){
                return 'go';
            }else{
                return 'stop';
            }
        });

    });
}