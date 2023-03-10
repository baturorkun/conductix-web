
// Power & Current Datasets
var PiLineChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [{
        data: [],
        label: 'Charging Power',
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.red, //'transparent',
        borderWidth: 0,
        fill: false,
        yAxisID: 'y-axis-1',
        cubicInterpolationMode: 'monotone',
        pointRadius: 2,
        //pointHoverRadius: 15,
        pointStyle: 'circle',
                    //'triangle',
                    //'rect',
                    //'rectRounded',
                    //'rectRot',
                    //'cross',
                    //'crossRot',
                    //'star',
                    //'line',
                    //'dash',
        //lineTension: 0
    }, {
        data: [],
        label: 'Charging Current',
        borderColor: window.chartColors.blue,
        backgroundColor: window.chartColors.blue, //'transparent',
        borderWidth: 0,
        fill: false,
        yAxisID: 'y-axis-2',
        cubicInterpolationMode: 'monotone',
        pointRadius: 2,
        //pointHoverRadius: 15,
        pointStyle: //'circle',
                    //'triangle',
                    'rect',
                    //'rectRounded',
                    //'rectRot',
                    //'cross',
                    //'crossRot',
                    //'star',
                    //'line',
                    //'dash',
        //lineTension: 0
        
    }]
};

// General Chart configuration
var PiLineChartConfig = {
    data: PiLineChartData,
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,

        title: {
            display: false,
            text: 'MPU Charging Power & Current'
        },

        tooltips: {
            intersect: false,
            cornerRadius: 2,
            backgroundColor: 'rgba(233, 91, 16, 0.85)', //'#E95B10', 
            borderColor: 'rgba(233, 91, 16, 0.85)', //'#E95B10',
            borderWidth: 0,
            titleFontColor: 'white', 
            titleFontStyle: 'normal',
            bodyFontColor: 'white',
            caretPadding: 0,
            multiKeyBackground: 'white',
            //mode: 'index',
            //bodyFontSize: 12,
            //caretSize: 5,
            //footerSpacing: 2,
            //footerMarginTop: 6,
            //rtl: true,
        },

        hover: {
            //mode: 'index',
            //intersect: false,
        },

        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                },
                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],

            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Power [W]'
                },
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                    suggestedMin: -5,
                    suggestedMax: 3000,
                },
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Current [mA]'
                },
                position: 'right',
                id: 'y-axis-2',
                ticks: {
                    suggestedMin: -5,
                    suggestedMax: 20000,
                },

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    }
}



//
// This is the AJAX callback. This function creates the chart, after the AJAX function
// receives the data.
//
function _callback_i(data_i) {

    if (typeof (PiLineChart) !== "undefined") {
        
        let language = document.getElementById("lan").innerHTML.substring(0, 2); 

        if (language == "DE")
        {
            PiLineChartConfig.options.scales.yAxes[1].scaleLabel.labelString = "Strom [mA]";
            PiLineChart.data.datasets[1].label = "Ladestrom";
        }
        else
        {
            PiLineChartConfig.options.scales.yAxes[1].scaleLabel.labelString = "Current [mA]";
            PiLineChart.data.datasets[1].label = "Charging Current";
        }

        //
        // Heat-sink Temperature
        //
        PiLineChart.data.datasets[1].data = data_i;
    
        console.log(PiLineChart.data.datasets[1].data);
    
        //PiLineChart.options.tooltips.destroy();
        //PiLineChart.reset();
        PiLineChart.update(0);
    }
}

//
//
//
function _ajaxGetCurrent() {

    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        try {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            this.__user_callback__ = _callback_i;
            //this.__user_callback__(this.responseText.split(',').map(Number));
            //document.getElementById("ajax-values").innerHTML = this.responseText;
            var json = JSON.parse(this.responseText);
            this.__user_callback__(json);
            //console.log(this.responseText);
            //console.log(this.response.split(',').map(Number));
        }
    }
    httpRequest.open('GET', '/GetCurrent.cgi', true);
    httpRequest.send();
    //setTimeout(_ajaxGetCurrent, 1000);
}

//
// Get Current every second
//
setInterval(_ajaxGetCurrent, 1000);


//
// This is the AJAX callback. This function creates the chart, after the AJAX function
// receives the data.
//
function _callback_p(data_p) {

    if (typeof (PiLineChart) !== "undefined") {

        let language = document.getElementById("lan").innerHTML.substring(0, 2); 

        if (language == "DE")
        {
            PiLineChartConfig.options.scales.xAxes[0].scaleLabel.labelString = "Zeit";
            PiLineChartConfig.options.scales.yAxes[0].scaleLabel.labelString = "Leistung [W]";
            PiLineChart.data.datasets[0].label = "Ladeleistung";
        }
        else
        {
            PiLineChartConfig.options.scales.xAxes[0].scaleLabel.labelString = "Time";
            PiLineChartConfig.options.scales.yAxes[0].scaleLabel.labelString = "Power [W]";
            PiLineChart.data.datasets[0].label = "Charging Power";
        }
    
        //
        // Charging Power
        //
        PiLineChart.data.datasets[0].data = data_p;
    
        console.log(PiLineChart.data.datasets[0].data);
    
        //PiLineChart.options.tooltips.destroy();
        //PiLineChart.reset();
        PiLineChart.update(0);
    }
}

function _ajaxGetPower() {

    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        try {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            this.__user_callback__ = _callback_p;
            //this.__user_callback__(this.responseText.split(',').map(Number));
            //document.getElementById("ajax-values").innerHTML = this.responseText;
            var json = JSON.parse(this.responseText);
            this.__user_callback__(json);
            //console.log(this.responseText);
            //console.log(this.response.split(',').map(Number));
        }
    }
    httpRequest.open('GET', '/GetPower.cgi', true);
    httpRequest.send();
    //setTimeout(_ajaxGetPower, 1000);
}

//
// Get Power every second
//
setInterval(_ajaxGetPower, 1000);