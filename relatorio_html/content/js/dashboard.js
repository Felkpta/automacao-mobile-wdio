/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 91.70694864048339, "KoPercent": 8.293051359516616};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8962235649546828, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9849557522123894, 500, 1500, "Request - YouTube-8"], "isController": false}, {"data": [0.9795008912655971, 500, 1500, "Request - YouTube-9"], "isController": false}, {"data": [0.9842931937172775, 500, 1500, "Request - YouTube-6"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-7"], "isController": false}, {"data": [0.9845454545454545, 500, 1500, "Request - YouTube-20"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-10"], "isController": false}, {"data": [0.0, 500, 1500, "Request - YouTube-21"], "isController": false}, {"data": [0.9875, 500, 1500, "Request - YouTube-11"], "isController": false}, {"data": [0.9811827956989247, 500, 1500, "Request - YouTube-12"], "isController": false}, {"data": [0.985445205479452, 500, 1500, "Request - YouTube-0"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-1"], "isController": false}, {"data": [0.15995260663507108, 500, 1500, "Request - YouTube"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-4"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "Request - YouTube-5"], "isController": false}, {"data": [0.985445205479452, 500, 1500, "Request - YouTube-2"], "isController": false}, {"data": [0.9844559585492227, 500, 1500, "Request - YouTube-3"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-13"], "isController": false}, {"data": [0.9819819819819819, 500, 1500, "Request - YouTube-14"], "isController": false}, {"data": [0.9855855855855856, 500, 1500, "Request - YouTube-15"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-16"], "isController": false}, {"data": [0.9909584086799277, 500, 1500, "Request - YouTube-17"], "isController": false}, {"data": [0.9927404718693285, 500, 1500, "Request - YouTube-18"], "isController": false}, {"data": [1.0, 500, 1500, "Request - YouTube-19"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13240, 1098, 8.293051359516616, 464.18821752265933, 6, 6013, 306.0, 493.89999999999964, 719.7999999999956, 5326.0, 71.98625519236205, 2530.5475348768377, 35.56756862719112], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Request - YouTube-8", 565, 0, 0.0, 359.74690265486714, 209, 735, 359.0, 478.0, 493.0, 506.0400000000002, 3.241686365409772, 31.640939890026505, 1.1213670879902693], "isController": false}, {"data": ["Request - YouTube-9", 561, 0, 0.0, 366.0534759358286, 209, 587, 364.0, 488.0, 497.0, 506.38, 3.2187179060547466, 9.999387480779491, 0.45649827087146355], "isController": false}, {"data": ["Request - YouTube-6", 573, 0, 0.0, 363.76439790575864, 207, 968, 367.0, 480.6, 498.0, 603.04, 3.2868508756331347, 60.68739544852895, 0.46615145004330844], "isController": false}, {"data": ["Request - YouTube-7", 565, 0, 0.0, 8.408849557522116, 7, 28, 8.0, 10.0, 11.0, 23.340000000000032, 3.2464920647689532, 3.4222782527408437, 0.9359757378586944], "isController": false}, {"data": ["Request - YouTube-20", 550, 0, 0.0, 359.72909090909087, 210, 750, 357.5, 481.90000000000003, 496.44999999999993, 506.0, 3.1588862341481345, 12.772899277835531, 1.0927155096288597], "isController": false}, {"data": ["Request - YouTube-10", 560, 0, 0.0, 8.203571428571426, 6, 24, 8.0, 9.0, 10.949999999999932, 13.389999999999986, 3.2215197519429792, 3.3959663049168447, 0.9287823913743809], "isController": false}, {"data": ["Request - YouTube-21", 549, 549, 100.0, 359.01821493624726, 210, 507, 357.0, 481.0, 496.0, 505.5, 3.1531428046315013, 2.591010249508937, 1.0907355969146297], "isController": false}, {"data": ["Request - YouTube-11", 560, 0, 0.0, 359.451785714286, 208, 714, 364.5, 475.0, 493.0, 507.0, 3.213754870847226, 18.95246140086714, 1.1117112491463463], "isController": false}, {"data": ["Request - YouTube-12", 558, 0, 0.0, 358.42114695340524, 208, 801, 359.0, 479.0, 497.04999999999995, 515.1499999999995, 3.2003670671905025, 24.58552033745806, 0.4538939053941671], "isController": false}, {"data": ["Request - YouTube-0", 584, 0, 0.0, 356.2311643835614, 208, 511, 354.5, 480.0, 495.0, 507.0, 3.348566251727321, 3.1440516003165087, 0.47491254092532814], "isController": false}, {"data": ["Request - YouTube-1", 584, 0, 0.0, 9.676369863013706, 6, 48, 8.0, 11.0, 27.0, 36.0, 3.3574409860758183, 3.5392769213300985, 0.9679838502201883], "isController": false}, {"data": ["Request - YouTube", 844, 549, 65.04739336492891, 3627.034360189569, 494, 6013, 4875.0, 5435.5, 5589.75, 5763.799999999998, 4.588851917096192, 2229.4208211934683, 17.883968463196755], "isController": false}, {"data": ["Request - YouTube-4", 576, 0, 0.0, 8.65104166666667, 6, 31, 8.0, 10.0, 11.0, 26.0, 3.312191279046365, 3.491574685313077, 0.9549369835482999], "isController": false}, {"data": ["Request - YouTube-5", 576, 0, 0.0, 357.8177083333334, 208, 735, 358.5, 477.30000000000007, 494.0, 507.0, 3.3067909775126734, 25.799853166065777, 1.143908019829264], "isController": false}, {"data": ["Request - YouTube-2", 584, 0, 0.0, 365.75684931506856, 209, 824, 368.0, 482.5, 495.75, 506.15, 3.3486046524962587, 35.25602230993515, 1.1583734289080911], "isController": false}, {"data": ["Request - YouTube-3", 579, 0, 0.0, 359.4559585492227, 208, 705, 355.0, 479.0, 494.0, 508.0, 3.3229074004992967, 23.638803749748917, 0.47127988787339664], "isController": false}, {"data": ["Request - YouTube-13", 555, 0, 0.0, 8.715315315315301, 7, 221, 8.0, 10.0, 10.0, 15.199999999999704, 3.1881343956618395, 3.3607857404944768, 0.9191635150330589], "isController": false}, {"data": ["Request - YouTube-14", 555, 0, 0.0, 361.4432432432433, 207, 509, 358.0, 485.0, 497.19999999999993, 507.0, 3.1819927874830154, 2.6147468076155693, 1.1007303175112801], "isController": false}, {"data": ["Request - YouTube-15", 555, 0, 0.0, 361.2306306306306, 209, 660, 363.0, 482.40000000000003, 495.0, 507.43999999999994, 3.1830512557280586, 16.849448665412563, 0.4514307331484679], "isController": false}, {"data": ["Request - YouTube-16", 553, 0, 0.0, 8.350813743218794, 6, 33, 8.0, 10.0, 11.0, 15.920000000000073, 3.1803176867070775, 3.352505893005026, 0.91688998322138], "isController": false}, {"data": ["Request - YouTube-17", 553, 0, 0.0, 363.66003616636493, 210, 638, 363.0, 480.0, 495.0, 503.46000000000004, 3.171908249829359, 16.23352901141715, 1.0972219633136977], "isController": false}, {"data": ["Request - YouTube-18", 551, 0, 0.0, 361.7350272232307, 210, 553, 358.0, 479.0, 491.0, 504.0, 3.1623411655322027, 9.13916395067379, 0.44847623114647783], "isController": false}, {"data": ["Request - YouTube-19", 550, 0, 0.0, 8.24363636363636, 7, 32, 8.0, 9.0, 10.0, 14.0, 3.16348305235852, 3.3347560019901183, 0.9120346354660961], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.io.IOException/Non HTTP response message: Exceeded maximum number of redirects: 20", 1098, 100.0, 8.293051359516616], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13240, 1098, "Non HTTP response code: java.io.IOException/Non HTTP response message: Exceeded maximum number of redirects: 20", 1098, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Request - YouTube-21", 549, 549, "Non HTTP response code: java.io.IOException/Non HTTP response message: Exceeded maximum number of redirects: 20", 549, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Request - YouTube", 844, 549, "Non HTTP response code: java.io.IOException/Non HTTP response message: Exceeded maximum number of redirects: 20", 549, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
