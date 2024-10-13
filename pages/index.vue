<template>
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-4 px-2">
        <div class="xl:col-span-2 sm:col-span-4">
            <div class="p-5 pb-0 bg-gray-100  dark:bg-hyperpay-800 dark:border-gray-700 shadow-md border rounded-md">

                <div class="flex">


                    <!-- text and button -->
                    <div class="w-1/2 mt-1 mt-sm-0 flex flex-col justify-between" v-if="chartData.salesBar.topMerchant"
                        cols="4" order="1">
                        <div>
                            <h4 class="card-title font-weight-bolder mb-2">
                                Transactions Volume
                            </h4>


                            <h5 class="font-medium-2">
                                <span>Top merchant </span>
                                <span class="text-success">{{ chartData.salesBar.topMerchant }}</span>
                            </h5>
                            <label class="font-weight-bold mb-2">
                                Made <span class="text-success mr-50">{{ "firstTwoMerchants[0]" }}</span>Transactions
                            </label>
                        </div>


                    </div>

                    <div cols="8" v-else align-self="center">

                        <h4>No Data found</h4>
                    </div>

                    <!-- dropdown and chart -->
                    <div class="w-1/2 text-right" :cols="chartData.salesBar.topMerchant ? 8 : 4" order="2" col>
                        <!--
                 <b-dropdown right :text="{
                        7: 'Last 7 Days',
                        30: 'Last Month',
                        180: 'Last six months',
                        365: 'Last Year',
                    }[days]" variant="transparent" class="chart-dropdown" toggle-class="p-50" size="sm">
                        <b-dropdown-item @click="setDays(7)" :active="days == 7">
                            Last 7 Days
                        </b-dropdown-item>
                        <b-dropdown-item @click="setDays(30)" :active="days == 30">
                            Last Month
                        </b-dropdown-item>
                        <b-dropdown-item @click="setDays(180)" :active="days == 180">
                            Last Six Months
                        </b-dropdown-item>
                        <b-dropdown-item @click="setDays(365)" :active="days == 365">
                            Last Year
                        </b-dropdown-item>
                    </b-dropdown>
                -->

                        <!-- apex chart -->
                        <apexchart class="-pb-5" type="bar" height="240" :options="salesBar.chartOptions"
                            :series="chartData.salesBar.series" />

                    </div>
                </div>

            </div>
        </div>

        <div class="xl:col-span-2 sm:col-span-4">

            <div class="p-5 pb-0 bg-gray-100 dark:bg-hyperpay-800 dark:border-gray-700 shadow-md border rounded-md">

                <div class="flex">


                    <!-- text and button -->
                    <div class="w-1/2 mt-1 mt-sm-0 flex flex-col justify-between" v-if="chartData.salesBar.topMerchant"
                        cols="4" order="1">
                        <div>
                            <h4 class="card-title font-weight-bolder mb-2">
                                Transactions Volume
                            </h4>


                            <h5 class="font-medium-2">
                                <span>Top merchant </span>
                                <span class="text-success">{{ chartData.salesBar.topMerchant }}</span>
                            </h5>
                            <label class="font-weight-bold mb-2">
                                Made <span class="text-success mr-50">{{ "firstTwoMerchants[0]" }}</span>Transactions
                            </label>
                        </div>


                    </div>

                    <div cols="8" v-else align-self="center">

                        <h4>No Data found</h4>
                    </div>

                    <!-- dropdown and chart -->
                    <div class="w-1/2 text-right" :cols="chartData.salesBar.topMerchant ? 8 : 4" order="2" col>
                        <!--
                 <b-dropdown right :text="{
                        7: 'Last 7 Days',
                        30: 'Last Month',
                        180: 'Last six months',
                        365: 'Last Year',
                    }[days]" variant="transparent" class="chart-dropdown" toggle-class="p-50" size="sm">
                        <b-dropdown-item @click="setDays(7)" :active="days == 7">
                            Last 7 Days
                        </b-dropdown-item>
                        <b-dropdown-item @click="setDays(30)" :active="days == 30">
                            Last Month
                        </b-dropdown-item>
                        <b-dropdown-item @click="setDays(180)" :active="days == 180">
                            Last Six Months
                        </b-dropdown-item>
                        <b-dropdown-item @click="setDays(365)" :active="days == 365">
                            Last Year
                        </b-dropdown-item>
                    </b-dropdown>
                -->

                        <!-- apex chart -->
                        <apexchart class="-pb-5" type="area" height="240" :options="areaChartOptions"
                            :series="chartData.salesBar.series" />

                    </div>
                </div>

            </div>
        </div>
        <div class="col-span-4  ">
            <div class="p-5 pb-0 bg-gray-100 h-80 dark:bg-hyperpay-800 dark:border-gray-700 shadow-md border rounded-md">
                <apexchart :series="option2.series" height="250" type="bar" :options="option2" />
            </div>
        </div>
        <div class="xl:col-span-2 sm:col-span-4 ">
            <div class="p-5 pb-0 bg-gray-100 h-80 dark:bg-hyperpay-800 dark:border-gray-700 shadow-md border rounded-md">
                <apexchart :series="rulesOptions.series" height="250" type="bar" :options="rulesOptions" />
            </div>
        </div>
        <div class="xl:col-span-1 sm:col-span-2">
            <div
                class="w-full py-5 relative bg-gray-100 items-center dark:bg-hyperpay-800 dark:border-gray-700 shadow-md border rounded-md">
                <apexchart type="donut"  :series="[44, 55, 41, 17, 15]" :options="pieOpt" />
            </div>
        </div>
        <div class="xl:col-span-1 sm:col-span-2">
            <div
                class="w-full py-5 relative bg-gray-100 items-center dark:bg-hyperpay-800 dark:border-gray-700 shadow-md border rounded-md">
                <apexchart type="donut"  :series="[44, 55, 41, 17, 15]" :options="pieOpt" />
            </div>
        </div>

        <div @click="login">Login</div>

    </div>
</template>


<script setup>


const login = ()=>{

    // https://sadad.prosysjo.com/POS/User/v1/LoginPOS

    let formData =new FormData()

    let data = {
            UserName:'s6',
            Password:"Ahmad123",
            RemoteIP:"192.168.0.6",
            MacAddress:"xxx",
            LanguageId:2
        };

    for (const item in data) {
        formData.append(item, data[item]);
    }

    $fetch(
      "https://sadad.prosysjo.com/POS/User/v1/LoginPOS",
      {
        method: "POST",
        body:formData
      }
    ).then((res) => {
      console.log(res);
    });
}

const generateColors = () => {
    return '#ebf0f7'
};

const formatter = (val, opt) => {
    return "Ahmad"
}


const option2 = {
    series: [{
        name: 'Rule #1',
        data: [44, 55, 41, 67, 22, 43, 21, 49, 27, 19]
    }, {
        name: 'Rule #2',
        data: [13, 23, 20, 8, 13, 27, 33, 12, 60, 37]
    }, {
        name: 'Rule #3',
        data: [11, 17, 15, 15, 21, 14, 15, 13, 42, 11]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    xaxis: {
        categories: ['214 - bespoke 5', 'kitkatsmart.com0', 'iZone Telecom', 'Websity', 'Biolab', 'Angami',
            'Leapership', 'GamesXP', 'Sameh mall', 'Jenny'
        ],
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
    },
    colors: ['#ff6c0a', '#ff8f37', '#f05406', '#00B490', '#86DA7C', '#F9F871'],
}

var pieOpt = {
    colors: ['#ff6c0a', '#FD4E16', '#f05406', '#00B490', '#86DA7C', '#2F4858'],

    grid: {
        show: false,
        padding: {
            left: 0,
            right: 0,
        },
    },
};

var rulesOptions = {
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    chart: {
        type: 'bar',
        height: 380
    },
    plotOptions: {
        bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
                position: 'bottom'
            },
        }
    },
    colors: ['#ff6c0a', '#FD4E16', '#008896', '#00B490', '#86DA7C', '#2F4858'],
    dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
            colors: ['#fff']
        },
        formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
            enabled: true
        }
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'India'
        ],
    },
    yaxis: {
        labels: {
            show: false
        }
    },
    title: {
        text: 'Custom DataLabels',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: 'Category Names as DataLabels inside bars',
        align: 'center',
    },
    tooltip: {
        theme: 'dark',
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function () {
                    return ''
                }
            }
        }
    }
};


const areaChartOptions = {
    grid: {
        show: false,
        padding: {
            left: 0,
            right: 0,
        },
    },
    colors: ["#28c76f"],
    chart: {
        toolbar: {
            show: false,
        },
        sparkline: {
            enabled: true,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2.5,
    },

    xaxis: {
        type: 'numeric',
        lines: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            show: false
        },
    },
    yaxis: [{
        y: 0,
        offsetX: 0,
        offsetY: 0,
        padding: {
            left: 0,
            right: 0,
        },
    },],
    tooltip: {
        x: {
            show: false
        },
    },

}



const chartData = {
    salesBar: {
        merchants: [],
        topMerchant: "N/A",
        series: [
            {
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]

            },
        ],
    },
}
const salesBar = {
    chartOptions: {
        chart: {
            sparkline: { enabled: true },
            toolbar: { show: false },
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        colors: ['#ff6c0a', '#ff6c0a', '#ff6c0a', '#ff6c0a', '#ff6c0a', '#ff6c0a'],
        plotOptions: {
            bar: {
                borderRadius: 10,
                borderRadiusApplication: 'end',
                //   borderRadiusWhenStacked: 'last',
                columnWidth: '55%',
                barHeight: '55%',
                colors: {
                    ranges: [{
                        from: 0,
                        to: 0,
                        color: undefined
                    }],
                    backgroundBarColors: [],
                    backgroundBarOpacity: 1,
                    backgroundBarRadius: 0,
                },
            }
        },
        xaxis: {
            type: 'numeric',
        },
        tooltip: {
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: formatter
                }
            }
        }
    },


};




</script>