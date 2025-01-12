<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import { csvParse } from 'd3-dsv';
    import { timeParse, timeFormat } from 'd3-time-format';
    import { areaChartOptions } from '$data/area-chart-options.js';  // Configuration for stacked area chart
    import TotalShips from '$components/TotalShips.svelte';
    import CurrentShips from '$components/CurrentShips.svelte';
    import MonthlyShipChart from '$components/MonthlyShipChart.svelte';

    // DATA
    const currentShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/master/data/current-ships.json';
    const monthlyShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/refs/heads/master/data/output/ships-monthly.csv';

    // VARIABLES
    $: totalShips = 0;
    $: areaChartData = [];
    let chartData, currentShipsData, monthlyShipData, seriesNames;
    const fillOpacity = '0.3';
    const formatDate = timeFormat("%b ’%y");
    const parseDatetime = timeParse('%Y-%m');
    const seriesColors = ['rgba(53, 162, 235', 'rgba(75, 192, 192', 'rgba(255, 99, 132'];
    // const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];



    // Add commas to numbers
    function addCommasToNumber(number) {
        if (number === null) return 0;
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // fetch data
    async function fetchData(url, format) {
        let finalData;
        try {
            const resp = await fetch(url);
            const data = await resp.text();
            finalData = format === 'json' ? JSON.parse(data) : csvParse(data);
        } catch (err) {
            console.error('Error: ', err)
        }

        return finalData;
    }

    // get total ship count
    function getTotalShips(data) {
        let total = 0;
        data.forEach(d => {
            total += d.Westridge ? parseInt(d.Westridge) : 0;
            total += d.Suncor ? parseInt(d.Suncor) : 0;
        });

        return total;
    }

    function formatAreaChartData(inputData) {
        const terminals = Object.keys(inputData[0]).slice(1);
        const formatedData = {
            labels: inputData.map(d => formatDate(parseDatetime(d.year_month))),
            datasets: [
                {
                    label: terminals[0],
                    // default to 0 if empty value
                    data: inputData.map(d => parseFloat(d[terminals[0]]) || 0),
                    fill: true,
                    backgroundColor: `${seriesColors[0]}, ${fillOpacity})`,
                    borderColor: `${seriesColors[0]})`,
                    pointRadius: 0,
                    pointHitRadius: 50,
                    stepped: true
                },
                {
                    label: terminals[1],
                    // default to 0 if empty value
                    data: inputData.map(d => parseFloat(d[terminals[1]]) || 0),
                    fill: true,
                    backgroundColor: `${seriesColors[1]}, ${fillOpacity})`,
                    borderColor: `${seriesColors[1]})`,
                    pointRadius: 0,
                    pointHoverRadius: 10,
                    pointHitRadius: 50,
                    stepped: true
                }
            ]
        }
        return formatedData;
    }

    async function init() {
        // fetch remote data or current & monthly ship counts
        currentShipsData = await fetchData(currentShipsUrl, 'json');
        monthlyShipData = await fetchData(monthlyShipsUrl, 'csv');
        
        // total ships moored since May 1, 2024
        totalShips = getTotalShips(monthlyShipData);
        areaChartData = formatAreaChartData(monthlyShipData);
    }
    
    onMount(init);
</script>

<main>
    <CurrentShips
        data={currentShipsData}
    />
    <TotalShips 
        count={addCommasToNumber(totalShips)}
    />

    <MonthlyShipChart 
        data={areaChartData}
        chartOptions={areaChartOptions}
    />
</main>

<footer>
    <p class="note">NOTE: tk.</p>
    <p class="source">Sources: <a href="https://aisstream.io/" target="_blank">aisstream.io</a>, <a href="https://www.equasis.org/" target="_blank">Equasis</a></p>
</footer>
  
<style>
    @import '$css/normalize.css';
    @import '$css/fonts.css';
    @import '$css/colors.css';
    @import '$css/app.css';

    main {
        margin-top: 1rem;
    }

    /* COMBOBOX SELECTOR */
  	:global(.svelte-select) {
		margin: 1rem auto !important;
		max-width: 250px;
  	}
  	:global(input:focus) {
		outline: none;
  	}

	:global(
		.svelte-select .selected-item,
		.svelte-select .item,
		.svelte-select input
	) {
		font-family: 'BentonSansCond-Regular', sans;
	}
</style>
