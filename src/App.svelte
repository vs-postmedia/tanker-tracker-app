<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import { csvParse } from 'd3-dsv';
    import Topline from "$components/Topline.svelte";
    import CurrentShips from "$components/CurrentShips.svelte";

    // DATA
    const currentShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/master/data/current-ships.json';
    const monthlyShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/master/data/ships-monthly.csv';

    // VARIABLES
    let currentShipsData, monthlyShipData;
    $: totalShips = 0;
    $: monthlyShips = 0;
    const monthlyShipsEmbed = {
        dimensions: 'width:100%;height:300px;',
        url: 'https://flo.uri.sh/visualisation/18776706/embed'
    };

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
        console.log(data)
        let total = 0;
        data.forEach(d => {
            total += d.Westridge ? parseInt(d.Westridge) : 0;
            total += d.Suncor ? parseInt(d.Suncor) : 0;
        });

        return total;
    }

    async function init() {
        // fetch remote data or current & monthly ship counts
        currentShipsData = await fetchData(currentShipsUrl, 'json');
        monthlyShipData = await fetchData(monthlyShipsUrl, 'csv')
        
        // total ships moored since May 1, 2024
        totalShips = getTotalShips(monthlyShipData);

        console.log(totalShips)
    }

    onMount(init);
</script>

<main>
    <!-- this can't load until  -->
    <Topline 
        count={addCommasToNumber(totalShips)}
    />

    
    <!-- MONTHLY SHIPS -->
    <iframe src={monthlyShipsEmbed.url} title='Monthly tanker traffic' class='flourish-embed-iframe' frameborder='0' scrolling='no' style={monthlyShipsEmbed.dimensions} sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/18627199/?utm_source=embed&utm_campaign=visualisation/18627199' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>
    
    
    <CurrentShips
        data={currentShipsData}
    />
</main>

<footer>
    <p class="note">NOTE: tk.</p>
    <p class="source">Source:  <a href="https:vancouversun.com" target="_blank">TK</a></p>
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
