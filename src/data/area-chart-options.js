export const areaChartOptions = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
                drawTicks: true
            },
            stacked: true,
        },
        y: {
            beginAtZero: true,
            border: {
                display: false
            },
            grid: {
                drawTicks: false
            },
            stacked: true
        },
    },
    tooltip: {
        enabled: true, // Enable tooltips
        mode: 'index', // Show tooltips for all datasets at the hovered index
        intersect: false, // Show tooltips even if not directly over a point
        callbacks: {
            // Customize tooltip labels
            label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            },
            title: function (tooltipItems) {
                return `Month: ${tooltipItems[0].label}`;
            }
        }
    }
};