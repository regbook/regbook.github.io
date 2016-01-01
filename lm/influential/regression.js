/**
 * ## 인터랙티브 단순선형회귀
 *
 * - 마우스로 클릭하여 데이터를 추가할 수 있다.
 * - 점을 드래그하여 데이터를 변경할 수 있다.
 * - Shift키를 누른 상태에서 점을 클릭하면 삭제된다.
 * - Clear All 버튼을 누르면 모든 데이터가 삭제된다.
 * - 회귀직선이 즉시 변경된다.
 *
 * <div>
 * <button type="button" onclick="clearAll()">Clear All</button>
 * <div id="canvas"></div>
 * <div>
 */

//== head
var width = $("#plot").parent().width();
var height = width;

var svg = d3.select("#plot")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");


var margin = { top : 30, right : 30, bottom : 30, left : 30 };  // top right bottom left

var mydata = [{x: 3, y:3}, {x:10, y:19}, {x:17, y: 30}];

var infludata = [
    { y: 20.0, x: 1.0 },
    { y: 7.2, x: 2.5 },
    { y: 16.0, x: 4.0 },
    { y: 18.0, x: 5.0 },
    { y: 19.0, x: 6.0 },
    { y: 20.0, x: 7.0 },
    { y: 22.0, x: 8.0 },
    { y: 23.0, x: 9.0 },
    { y: 26.0, x: 10.0 },
    { y: 32.0, x: 15.0 },
    { y: 33.0, x: 15.5 }
];


var xlim = [0, 20];
var ylim = [0, 40];

var xscale = d3.scale.linear()
    .domain(xlim)
    .range([margin.left, width - margin.right]);

var yscale = d3.scale.linear()
    .domain(ylim)
    .range([height - margin.bottom, margin.top]);

var xaxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .ticks(5);

var yaxis = d3.svg.axis()
    .scale(yscale)
    .orient("left")
    .ticks(5);

svg.append("g")
    .attr("transform", "translate(" + 0 + "," + yscale(ylim[0]) + ")")
    .style({"fill" : "none", "stroke" : "black", "font-size" : "6pt"})
    .call(xaxis);

svg.append("g")
    .attr("transform", "translate(" + xscale(xlim[0]) + "," + 0 + ")")
    .style({"fill" : "none", "stroke" : "black", "font-size" : "6pt"})
    .call(yaxis);



svg.on("click", function() {
    if(d3.event.defaultPrevented) return;
    if(d3.event.shiftKey) return;
    
    var pos = d3.mouse(this);

    if($("input[name=add]").is(":checked")) {
	addPoint(pos[0], pos[1]);
	updateRegressionLine();
    }
});







function addPoint(x, y) {
    svg.append("circle")
	.attr("cx", x)
	.attr("cy", y)
	.attr("r", 5)
	.style("cursor", "pointer")
	.on("mouseenter", function() {
	    d3.select(this)
		.style("fill", "red");
	})
	.on("mouseleave", function() {
	    d3.select(this)
		    .style("fill", "black");
	})
	.on("click", function() {
	    if(!$("input[name=add]").is(":checked")) {	    
		this.remove();
		updateRegressionLine();
	    }
	})
	.call(drag)
	.on("touchmove", function() {
	    var x = d3.event.x;
	    var y = d3.event.y;
	    d3.select(this)
		.attr("cx", x)
		.attr("cy", y);
	    updateRegressionLine();	    
	});
}

var drag = d3.behavior.drag()
    .on("drag", function(d) {
	var x = d3.event.x;
	var y = d3.event.y;
	d3.select(this)
	    .attr("cx", x)
	    .attr("cy", y);


	updateRegressionLine();
    });


function lsfit(points) {
    var n = points.length;
    var sx = 0;
    var sy = 0;
    var sxx = 0;
    var syy = 0;
    var sxy = 0;
    for(var i=0; i<n; ++i) {
	var x = xscale.invert(points[i].cx.baseVal.value);
	var y = yscale.invert(points[i].cy.baseVal.value);
	sx = sx + x;
	sy = sy + y;
	sxx = sxx + x*x;
	sxy = sxy + x*y;
	syy = syy + y*y;
    }

    b1 = (sxy - sx*sy/n)/(sxx - sx*sx/n);
    b0 = sy/n - b1 * sx/n;

    var sst = syy - sy*sy/n;
    var sse = 0;
    for(var i=0; i<n; ++i) {
	var x = xscale.invert(points[i].cx.baseVal.value);
	var y = yscale.invert(points[i].cy.baseVal.value);
	var e = y - (b0 + b1*x);
	sse = sse + e*e;
	
    }
    return {a : b0, b : b1, xbar : sx/n, ybar : sy/n, rsq: 1 - sse/sst};
}

function updateRegressionLine() {
    var coef = lsfit(svg.selectAll("circle")[0]);
    if(isNaN(coef.a) || isNaN(coef.b) || isNaN(coef.xbar) || isNaN(coef.ybar)) {
	line.attr("stroke", "none");
    } else {
	line.attr("x1", 0)
	    .attr("y1", yscale(coef.a + xscale.invert(0)*coef.b))
	    .attr("x2", width)
	    .attr("y2", yscale(coef.a + xscale.invert(width)*coef.b))
	    .attr("stroke", "royalblue");
    }

    if (!isNaN(coef.a)) {
	d3.select("#intercept").text(coef.a.toPrecision(7));
    } else {
	d3.select("#intercept").text(0);
    }
    if(!isNaN(coef.b)) {
	d3.select("#slope").text((coef.b < 0 ? '' : '+') + coef.b.toPrecision(7));
    } else {
	d3.select("#slope").text('+0');	
    }

    if(!isNaN(coef.rsq)) {
	d3.select("#rsquared").text(coef.rsq.toPrecision(7));
    } else {
	d3.select("#rsquared").text(0);
    }
    
}

function clearAll() {
    svg.selectAll("circle").remove();
    updateRegressionLine();
}

function exampleDataset() {
    svg.selectAll("circle").remove();
    infludata.forEach(function(p) {
	addPoint(xscale(p.x), yscale(p.y));
    });
    updateRegressionLine();
}


// initial data points
mydata.forEach(function(p) {
    addPoint(xscale(p.x), yscale(p.y));
})

var line = svg.append("line");

updateRegressionLine();



//== body
