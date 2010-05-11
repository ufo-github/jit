function init(){
  //init data
  var json = {
      'label': ['label A', 'label B', 'label C', 'label D'],
      'values': [
      {
        'label': 'date A',
        'values': [20, 40, 15, 5]
      }, 
      {
        'label': 'date B',
        'values': [30, 10, 45, 10]
      }, 
      {
        'label': 'date E',
        'values': [38, 20, 35, 17]
      }, 
      {
        'label': 'date F',
        'values': [58, 10, 35, 32]
      }, 
      {
        'label': 'date D',
        'values': [55, 60, 34, 38]
      }, 
      {
        'label': 'date C',
        'values': [26, 40, 25, 40]
      }]
      
  };
  var json2 = {
      'values': [
      {
        'label': 'date A',
        'values': [10, 40, 15, 7]
      }, 
      {
        'label': 'date B',
        'values': [30, 40, 45, 9]
      }, 
      {
        'label': 'date D',
        'values': [55, 30, 34, 26]
      }, 
      {
        'label': 'date C',
        'values': [26, 40, 85, 28]
      }],
      
  };
  //end

    var infovis = document.getElementById('infovis');
    
    //init BarChart
    var barChart = new $jit.BarChart({
        injectInto: 'infovis',
        animate: true,
        orientation: 'vertical',
        barsOffset: 20,
        offset:10,
        labelOffset:5,
        type:'stacked:gradient',
        showAggregates:true,
        showLabels:true,
        Label: {
          size: 13,
          family: 'Arial',
          color: 'white'
        },
        Tips: {
          enable: true,
          onShow: function(tip, elem) {
            tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
          }
        }
    });
    //load JSON data.
    barChart.loadJSON(json);
    //end
    var list = $jit.id('id-list'),
        button = $jit.id('update'),
        orn = $jit.id('switch-orientation');
    //update json on click 'Update Data'
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      if(util.hasClass(button, 'gray')) return;
      util.removeClass(button, 'white');
      util.addClass(button, 'gray');
      barChart.updateJSON(json2);
    });
    //switch orientation on click 'Switch Side'
    $jit.util.addEvent(orn, 'click', function() {
      if(barChart.busy) return;
      var orn = barChart.config.orientation == 'horizontal'? 'vertical' : 'horizontal',
          canvas = barChart.canvas;
      barChart = new $jit.BarChart({
        useCanvas: canvas,
        orientation: orn,
        barsOffset: 20,
        offset:10,
        labelOffset:5,
        type:'stacked:gradient',
        showAggregates:true,
        showLabels:true,
        Label: {
          size: 13,
          family: 'Arial',
          color: 'white'
        },
        Tips: {
          enable: true,
          onShow: function(tip, elem) {
            tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
          }
        }
      });
      barChart.loadJSON(json);
    });
    //dynamically add legend to list
    var legend = barChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}
