<script>
    export let data;
    export let count;
    export let chartOptions;

    import { Chart, registerables } from 'chart.js';
    import { Chart as SvelteChart } from 'svelte-chartjs';

    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // update legend to remove box border
    chartOptions.plugins.legend.labels.generateLabels = function(chart) {
                    const original = Chart.defaults.plugins.legend.labels.generateLabels;
                    const labels = original(chart);
                    labels.forEach(label => {
                        label.strokeStyle = 'transparent'; // Remove border
                        label.borderWidth = 0;
                    }); 
                    return labels;
                }

    // Register required chart.js components
    Chart.register(...registerables);
</script>

<h2 class="topline-text">At least <span class="big-num">🛢️ {addCommasToNumber(count)} oil tankers 🛢️</span>have passed through the Burrard Inlet since the Trans Mountain Expansion pipeline (TMX) began operations on May 1, 2024</h2>

<h4 class="chart-header">Monthly tanker traffic at oil refineries/terminals in Vancouver’s Burrard Inlet</h4>
<SvelteChart type="line" {data} options={chartOptions} />

<style>
    .topline-text {
        font-size: 1.4rem;
        line-height: 1.75rem;
        margin: 0 auto 1rem auto;
        max-width: 600px;
        text-align: center;
    }
    .big-num {
        color: #A62F22;
        display: block;
        font-size: 2.8rem;
        padding: 18px 0;
        /* margin-right: 5px; */
    }
    .chart-header {
        font-size: 1rem !important;
        margin-top: 25px;
    }
</style>
