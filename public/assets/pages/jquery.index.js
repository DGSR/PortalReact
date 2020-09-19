/**
 * Theme: Uplon Admin Template
 * Author: Coderthemes
 * Dashboard
 */

!function($) {
    "use strict";
    var Components = function() {};
    var Dashboard = function() {};

    //creates Stacked chart
    Dashboard.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: true,
            labels: labels,
            hideHover: 'auto',
            barSizeRatio: 0.4,
            resize: true, //defaulted to true
            gridLineColor: '#eeeeee',
            barColors: lineColors
        });
    },
    Components.prototype.initCounterUp = function() {
        var delay = $(this).attr('data-delay')?$(this).attr('data-delay'):100; //default is 100
        var time = $(this).attr('data-time')?$(this).attr('data-time'):1200; //default is 1200
        $('[data-plugin="counterup"]').each(function(idx, obj) {
            $(this).counterUp({
                delay: 100,
                time: 1200
            });
        });
    },

        Dashboard.prototype.init = function() {

            //creating Stacked chart
            var $stckedData  = [
                { y: '2005', a: 45, b: 180, c: 100 },
                { y: '2006', a: 75,  b: 65, c: 80 },
                { y: '2007', a: 100, b: 90, c: 56 },
                { y: '2008', a: 75,  b: 65, c: 89 },
                { y: '2009', a: 100, b: 90, c: 120 },
                { y: '2010', a: 75,  b: 65, c: 110 },
                { y: '2011', a: 50,  b: 40, c: 85 },
                { y: '2012', a: 75,  b: 65, c: 52 },
                { y: '2013', a: 50,  b: 40, c: 77 },
                { y: '2014', a: 75,  b: 65, c: 90 },
                { y: '2015', a: 100, b: 90, c: 130 }
            ];
            this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'b' ,'c'], ['Series A', 'Series B', 'Series C'], ['#3db9dc','#1bb99a', '#ebeff2']);

        },
        Components.prototype.init = function() {
            var $this = this;
            this.initCounterUp()
        },
        //init
        $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard
        $.Components = new Components, $.Components.Constructor = Components
}(window.jQuery),

//initializing
    function($) {
        "use strict";
        $.Dashboard.init();
        $.Components.init();
    }(window.jQuery);
