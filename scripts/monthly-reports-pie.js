<script>
// determining the width and the height of the screen before resizing everything
// var width=$(document).width(); 
//               if (width>=1180) { // width here is the document width
//                 width=750;
//               } else {
//                 width= $("#inner-width").width(); 
//               }
// margin dimensions taken from ==> https://gist.github.com/mbostock/3019563
// var maxNum = d3.max(data, function (d) { return d.COUNT; });
var margin = {top: 20, right: 10, bottom: 20, left: 10};
var width = 350 - margin.left - margin.right, height = 350 - margin.top - margin.bottom;
var  color = d3.scale.linear()
  .domain([0,200])
  .range(["red","yellow"]);
var r = 150;
var arc = d3.svg.arc()
  .outerRadius(r)
  .innerRadius(r-(3*r/5));
var pie = d3.layout.pie()
  .sort(null)
  .value(function (d) { return d.COUNT; });
  // .value(function (d) { return d.income; });
var svg = d3.select("#summary-pie").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
// d3.csv("data_04.csv", function(error, data){
  d3.json("../data/jan-00.json", function (error, data) {
  data.forEach(function(d) {
    d.COUNT = +d.COUNT;
    // d.income = +d.income;
  });
  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class","arc");
  g.append("g")
    .append("path")
    .attr("d",0)
    .attr("d",arc)
    .style("fill", function(d) { return color(d.data.COUNT); })
    .on("mouseover",function (d) {
      d3.select(this)
        .transition()
        .ease("bounce")
        .duration(1000)
        .style("fill","#32004a")
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .transition()
        .ease("sin")
        .duration(500)
        .style("fill", function(d) { return color(d.data.COUNT); })
    });
    
  // g.append("text") and its contents are used to display text on each sector
  // is there a way we can move them up so that it watches for user activity and loads
  // the details of the sector on mouseover???
  var sum = d3.sum(data, function (d) { return d.COUNT; });
  g.append("text")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .style("fill","white")
    .text(function (d) {
      var fullName = d.data.AUTHOR;
      var firstLetter = fullName.charAt(0);
      var secLetter = fullName.charAt((fullName.indexOf(" ")+1));
      return firstLetter + secLetter + " " + Math.round((d.data.COUNT / sum * 100),0) + "%";
    });
    // .attr("class","hide")
    // .on("click", function (d) {
    //   d3.select(this).attr("class","show")
    // });
var table = d3.select("#data-table").append("div")
  .style("list-style","none")
  .style("float","left")
  .attr("class","list-group")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);
  // .append("g")
  // .attr("transform", "translate(" + width*2 + "," + height/2 + ")");
table.selectAll("a")//.append("g")
  .data(data)
  .enter().append("a")
    .attr("class","list-group-item")
    .style("fill", "black")
    .style("padding","0.5em 1em")
    .text(function (d) { return d.AUTHOR + " - " + d.COUNT; });
}); 
</script>