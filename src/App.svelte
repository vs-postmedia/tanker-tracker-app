<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import { csvParse } from 'd3-dsv';
    import { timeParse, timeFormat } from 'd3-time-format';
    import { areaChartOptions } from '$data/area-chart-options.js';  // Configuration for stacked area chart
    import TopImoTable from '$components/TopImoTable.svelte';
    import CurrentShips from '$components/CurrentShips.svelte';
    import MonthlyShipChart from '$components/MonthlyShipChart.svelte';

    // DATA
    const currentShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/master/data/current-ships.json';
    const topImoUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/refs/heads/master/data/top-imo-details.csv'
    const monthlyShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/refs/heads/master/data/output/ships-monthly.csv';

    // VARIABLES
    $: totalShips = 0;
    $: areaChartData = [];
    let chartData, currentShipsData, monthlyShipData, seriesNames, topImoData;
    const fillOpacity = '0.3';
    const formatDate = timeFormat("%b ’%y");
    const parseDatetime = timeParse('%Y-%m');
    const seriesColors = ['rgba(54,125,173', 'rgba(143,185,272', 'rgba(34,166,179'];
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
                    data: inputData.map(d => parseFloat(d[terminals[0]]) || 0), // default to 0 if empty value
                    fill: true,
                    backgroundColor: `${seriesColors[0]}, ${fillOpacity})`,
                    borderColor: `${seriesColors[0]})`,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHitRadius: 50,
                    stepped: 'middle'
                },
                {
                    label: terminals[1],
                    data: inputData.map(d => parseFloat(d[terminals[1]]) || 0), // default to 0 if empty value
                    fill: true,
                    backgroundColor: `${seriesColors[1]}, ${fillOpacity})`,
                    borderColor: `${seriesColors[1]})`,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 10,
                    pointHitRadius: 50,
                    stepped: 'middle'
                }
            ]
        }
        return formatedData;
    }

    async function init() {
        // fetch remote data or current & monthly ship counts
        currentShipsData = await fetchData(currentShipsUrl, 'json');
        monthlyShipData = await fetchData(monthlyShipsUrl, 'csv');
        topImoData = await fetchData(topImoUrl, 'csv');

        console.log(monthlyShipData)
        
        // total ships moored since May 1, 2024
        totalShips = getTotalShips(monthlyShipData);
        areaChartData = formatAreaChartData(monthlyShipData);
        console.log(areaChartData)
    }
    
    onMount(init);
</script>

<main>
    <MonthlyShipChart 
        data={areaChartData}
        chartOptions={areaChartOptions}
        count={totalShips}
    />

    <CurrentShips
        data={currentShipsData}
    />

    <!-- svelte-ignore missing-declaration -->
    <TopImoTable
        data={topImoData}
    />


</main>

<footer>
    <p class="note">Last update: tk</p>
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
