<script>
    export let data;
    export let chartOptions;

    import { Chart, registerables } from 'chart.js';
    import { Chart as SvelteChart } from 'svelte-chartjs';

    // Register required chart.js components
    Chart.register(...registerables);
    </script>

<SvelteChart type="line" {data} options={chartOptions} />